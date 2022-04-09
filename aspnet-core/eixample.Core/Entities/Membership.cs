using System;

namespace eixample.Entities
{
    public class Membership : Entity<long>, IHasCreationTime
    {
        public virtual ApplicationUser User { get; set; }

        public string UserId { get; set; }

        public virtual Tenant Tenant { get; set; }

        public int? TenantId { get; set; }

        public DateTime CreationTime { get; set; }
    }
}
