namespace eixample.Dto
{
    public class UpdateItemInput: EntityDto<long>
    {
        public string Name { get; set; }

        public string? Description { get; set; }
    }
}
