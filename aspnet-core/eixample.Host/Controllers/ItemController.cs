using eixample.Application;
using eixample.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eixample.Host.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class ItemController : ControllerBase
    {
        private IItemService _itemService;

        public ItemController(
            IItemService itemService
            )
        {
            _itemService = itemService;
        }
        
        [HttpPost]
        public async Task<bool> Add([FromBody] AddItemInput input)
        {
            var result = await _itemService.Add(input);
            return result;
        }

        [HttpPost]
        public async Task<bool> Update([FromBody] UpdateItemInput input)
        {
            var result = await _itemService.Update(input);
            return result;
        }

        [HttpPost]
        public async Task<bool> Delete([FromBody] EntityDto<long> input)
        {
            var result = await _itemService.Delete(input);
            return result;
        }

        [HttpGet]
        public async Task<List<ItemDto>> GetAll()
        {
            var result = await _itemService.GetAll();
            return result;
        }
    }
}