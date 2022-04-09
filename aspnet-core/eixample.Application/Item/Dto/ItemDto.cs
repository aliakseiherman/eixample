namespace eixample.Dto
{
    public class ItemDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string? Description { get; set; }

        public DateTime CreationTime { get; set; }

        public string CreatorId { get; set; }

        public DateTime? ModificationTime { get; set; }

        public string? ModifierId { get; set; }

        public int? TenantId { get; set; }
    }
}
