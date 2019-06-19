using eixample.Application;
using eixample.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eixample.Host.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private IPersonService _personService;

        public PersonController(
            IPersonService personService
            )
        {
            _personService = personService;
        }
        
        [HttpPost]
        public async Task<bool> Add([FromBody] PersonDto input)
        {
            var result = await _personService.Add(input);
            return result;
        }

        [HttpPost]
        public async Task<bool> Update([FromBody] PersonDto input)
        {
            var result = await _personService.Update(input);
            return result;
        }

        [HttpPost]
        public async Task<bool> Delete([FromBody] PersonDto input)
        {
            var result = await _personService.Delete(input);
            return result;
        }

        [HttpGet]
        public async Task<List<PersonDto>> GetAll()
        {
            var result = await _personService.GetAll();
            return result;
        }
    }
}