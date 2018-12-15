using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace eixample.Application.SeedData
{
    public static class SeedExtensions
    {
        public static IWebHost SeedData(this IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                new TenantsCreator(scope).Create();
                new UserCreator(scope).Create();
                new MembershipCreator(scope).Create();
            }

            return host;
        }
    }
}
