namespace eixample.Entities
{
    public interface IFullAudited : IHasCreationTime, IHasCreatorId, IHasModificationTime, IHasModifierId, IHasDeletionTime, IHasDeleterId, ISoftDelete, IHasTenant
    {
    }
}
