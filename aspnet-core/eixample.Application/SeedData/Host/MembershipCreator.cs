using eixample.Consts;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Threading.Tasks;

namespace eixample.Application.SeedData
{
    public class MembershipCreator
    {
        private readonly AppDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public MembershipCreator(IServiceScope scope)
        {
            _context = scope.ServiceProvider.GetService<AppDbContext>();
            _userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
        }

        public void Create()
        {
            Task.Run(async () => await CreateMembership()).ConfigureAwait(false).GetAwaiter().GetResult();
        }

        private async Task CreateMembership()
        {
            var hostAdminUser = await _userManager.FindByNameAsync(SetupConsts.Users.AdminJoe.UserName);

            var tenants = _context.Tenants.ToList();

            foreach (var tenant in tenants)
            {
                if (!_context.Memberships.Any(x => x.TenantId == tenant.Id && x.UserId == hostAdminUser.Id))
                {
                    _context.Memberships.Add(new Membership() { TenantId = tenant.Id, UserId = hostAdminUser.Id });
                }

                await _context.SaveChangesAsync();
            }

            // restricting John Roe from logging in to tenants other than 'galeriasenda'
            var johnRoe = await _userManager.FindByNameAsync(SetupConsts.Users.JohnRoe.UserName);
            var firstTenant = _context.Tenants.Single(x => x.HostName == SetupConsts.Tenants.GaleriaSenda.HostName);
            
            if (!_context.Memberships.Any(x => x.TenantId == firstTenant.Id && x.UserId == johnRoe.Id))
            {
                _context.Memberships.Add(new Membership() { TenantId = firstTenant.Id, UserId = johnRoe.Id });
            }

            await _context.SaveChangesAsync();
        }
    }
}
