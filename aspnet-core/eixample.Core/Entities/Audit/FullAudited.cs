﻿using System;

namespace eixample.Entities
{
    public class FullAudited<TPrimaryKey> : Entity<TPrimaryKey>, IFullAudited
    {
        public DateTime CreationTime { get; set; }

        public string CreatorId { get; set; }

        public virtual ApplicationUser Creator { get; set; }

        public DateTime? ModificationTime { get; set; }

        public string? ModifierId { get; set; }

        public virtual ApplicationUser Modifier { get; set; }

        public int? TenantId { get; set; }
    }
}
