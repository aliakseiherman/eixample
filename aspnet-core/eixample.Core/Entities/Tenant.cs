using System;

namespace eixample.Entities
{
    public class Tenant : Entity<int>, IHasCreationTime
    {
        public string Name { get; set; }

        public string HostName { get; set; }

        public DateTime CreationTime { get; set; }
    }
}
