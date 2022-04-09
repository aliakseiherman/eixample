using eixample.Dto;

namespace eixample.Application
{
    public interface IItemService
    {
        Task<bool> Add(AddItemInput input);

        Task<bool> Update(UpdateItemInput input);

        Task<bool> Delete(EntityDto<long> input);

        Task<List<ItemDto>> GetAll();
    }
}