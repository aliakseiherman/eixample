using eixample.Application;
using eixample.Consts;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using eixample.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eixample.Host.Filters
{
    public class MultiTenancyFilter : IAsyncActionFilter
    {
        private Session _session;
        private AppDbContext _dbContext;
        private ITenantService _tenantService;

        public MultiTenancyFilter(
            Session session,
            AppDbContext dbContext,
            ITenantService tenantService
            )
        {
            _session = session;
            _dbContext = dbContext;
            _tenantService = tenantService;
        }

        public async Task OnActionExecutionAsync(
            ActionExecutingContext context,
            ActionExecutionDelegate next
            )
        {
            string subdomain = context.HttpContext.Request.GetSubDomain();

            string userId = null;
            int? tenantId = null;

            var claimsIdentity = (ClaimsIdentity)context.HttpContext.User.Identity;

            var userIdClaim = claimsIdentity.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim != null)
            {
                userId = userIdClaim.Value;
            }

            var tenantIdClaim = claimsIdentity.Claims.SingleOrDefault(c => c.Type == CustomClaims.TenantId);
            if (tenantIdClaim != null)
            {
                tenantId = !string.IsNullOrEmpty(tenantIdClaim.Value) ? int.Parse(tenantIdClaim.Value) : (int?)null; // fetching from Claim for maximum performance
            }
            else
            {
                tenantId = _tenantService.GetBySubdomain(subdomain); // making db call when Claim is missing
            }

            _dbContext.UserId = userId;
            _dbContext.TenantId = tenantId;

            _session.UserId = userId;
            _session.TenantId = tenantId;
            _session.Subdomain = subdomain;

            var resultContext = await next();
        }
    }
}
