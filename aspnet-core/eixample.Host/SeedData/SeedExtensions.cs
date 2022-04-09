using eixample.Application;
using eixample.Entities;
using eixample.EntityFrameworkCore;
using eixample.SeedData;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace eixample.Extensions
{
    public static class SeedExtensions
    {
        public static void SeedData(this WebApplication host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetService<AppDbContext>();
                var tenantService = scope.ServiceProvider.GetService<ITenantService>();
                var userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
                var roleStore = new RoleStore<IdentityRole>(dbContext);

                new TenantsCreator(dbContext).Create();
                new UserCreator(dbContext, tenantService, userManager).Create();
                new MembershipCreator(dbContext, userManager).Create();
            }
        }
    }
}
