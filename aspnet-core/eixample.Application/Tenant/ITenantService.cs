using eixample.Entities;

namespace eixample.Application
{
    public interface ITenantService
    {
        int? GetBySubdomain(string subdomain);

        Tenant GetById(long id);
    }
}
