using eixample.Consts;
using eixample.Entities;
using eixample.EntityFrameworkCore;

namespace eixample.SeedData
{
    public class TenantsCreator
    {
        private readonly AppDbContext _context;

        public TenantsCreator(AppDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            CreateTenant(SetupConsts.Tenants.Subdomain1.Name, SetupConsts.Tenants.Subdomain1.HostName);
            CreateTenant(SetupConsts.Tenants.Subdomain2.Name, SetupConsts.Tenants.Subdomain2.HostName);
        }

        private void CreateTenant(string name, string hostName)
        {
            Tenant tenant = _context.Tenants.SingleOrDefault(x => x.HostName.Equals(hostName));

            if (tenant == null)
            {
                _context.Tenants.Add(new Tenant() { Name = name, HostName = hostName });
                _context.SaveChanges();
            }
        }
    }
}
