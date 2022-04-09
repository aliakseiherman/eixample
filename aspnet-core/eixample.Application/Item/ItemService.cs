using AutoMapper;
using eixample.Dto;
using eixample.Entities;
using eixample.EntityFrameworkCore;

namespace eixample.Application
{
    public class ItemService : IItemService
    {
        private AppDbContext _dbContext;
        private IMapper _mapper;
        private Session _session;

        public ItemService(
            AppDbContext dbContext,
            IMapper mapper,
            Session session
            )
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _session = session;
        }

        public async Task<bool> Add(AddItemInput input)
        {
            var item = new Item();
            item.Name = input.Name;
            item.Description = input.Description;
            _dbContext.Items.Add(item);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<bool> Update(UpdateItemInput input)
        {
            var item = _dbContext.Items.Single(x => x.Id == input.Id);
            item.Name = input.Name;
            item.Description = input.Description;
            _dbContext.Items.Update(item);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<bool> Delete(EntityDto<long> input)
        {
            var item = _dbContext.Items.Single(x => x.Id == input.Id);
            _dbContext.Items.Remove(item);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<List<ItemDto>> GetAll()
        {
            var items = _dbContext.Items.Where(x => x.TenantId == _session.TenantId).ToList();
            var dtos = _mapper.Map<List<ItemDto>>(items);
            return await Task.FromResult(dtos);
        }
    }
}
