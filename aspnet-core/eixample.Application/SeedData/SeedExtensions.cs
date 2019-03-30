using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace eixample.Application.SeedData
{
    public static class SeedExtensions
    {
        public static IWebHost SeedData(this IWebHost host)
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

            return host;
        }
    }
}
