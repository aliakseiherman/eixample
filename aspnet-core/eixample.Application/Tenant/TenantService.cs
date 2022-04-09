using eixample.Entities;
using eixample.EntityFrameworkCore;

namespace eixample.Application
{
    public class TenantService : ITenantService
    {
        private AppDbContext _dbContext;

        public TenantService(
            AppDbContext dbContext
            )
        {
            _dbContext = dbContext;
        }

        public int? GetBySubdomain(string subdomain)
        {
            if (!string.IsNullOrEmpty(subdomain))
            {
                var tenant = _dbContext.Tenants.SingleOrDefault(x => x.HostName.ToLower().Equals(subdomain.ToLower()));

                if (tenant != null)
                {
                    return tenant.Id;
                }
            }

            return null;
        }

        public Tenant GetById(long id)
        {
            var tenant = _dbContext.Tenants.SingleOrDefault(x => x.Id == id);
            return tenant;
        }
    }
}
