using eixample.Dto;

namespace eixample.Host.Models.Session
{
    public class GetCurrentLoginDetailsOutput
    {
        public TenantDto Tenant { get; set; }

        public UserDto User { get; set; }
    }
}
