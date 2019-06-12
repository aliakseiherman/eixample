namespace eixample.Dto
{
    public class PersonDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
