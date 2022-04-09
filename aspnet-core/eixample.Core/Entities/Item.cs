namespace eixample.Entities
{
    public class Item : FullAudited<long>
    {
        public string Name { get; set; }

        public string? Description { get; set; }
    }
}
