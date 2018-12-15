using eixample.Consts;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace eixample.Application.SeedData
{
    public class TenantsCreator
    {
        private readonly AppDbContext _context;

        public TenantsCreator(IServiceScope scope)
        {
            _context = scope.ServiceProvider.GetService<AppDbContext>();
        }

        public void Create()
        {
            CreateTenant(SetupConsts.Tenants.GaleriaSenda.Name, SetupConsts.Tenants.GaleriaSenda.HostName);
            CreateTenant(SetupConsts.Tenants.Restaura.Name, SetupConsts.Tenants.Restaura.HostName);
        }

        private void CreateTenant(string name, string hostName)
        {
            Tenant tenant = _context.Tenants.FirstOrDefault(x => x.HostName.Equals(hostName));

            if (tenant == null)
            {
                _context.Tenants.Add(new Tenant() { Name = name, HostName = hostName });
                _context.SaveChanges();
            }
        }
    }
}
