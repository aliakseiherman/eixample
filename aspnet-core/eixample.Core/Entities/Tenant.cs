using System;

namespace eixample.Entities
{
    public class Tenant : Entity<int>, ISoftDelete, IHasCreationTime
    {
        public string Name { get; set; }

        public string HostName { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime? DeletionTime { get; set; }
    }
}
