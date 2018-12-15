namespace eixample.Entities
{
    public class Team : FullAudited<long>
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
