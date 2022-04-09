namespace eixample.Entities
{
    public interface IFullAudited : IHasCreationTime, IHasCreator, IHasModificationTime, IHasModifier, IHasTenant
    {
    }
}
