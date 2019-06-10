namespace eixample.Entities
{
    public interface IFullAudited : IHasCreationTime, IHasCreator, IHasModificationTime, IHasModifier, IHasDeletionTime, IHasDeleter, ISoftDelete, IHasTenant
    {
    }
}
