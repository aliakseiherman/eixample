namespace eixample.Entities
{
    public class Person : FullAudited<long>
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
