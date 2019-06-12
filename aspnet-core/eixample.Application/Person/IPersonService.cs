using eixample.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eixample.Application
{
    public interface IPersonService
    {
        Task<bool> Add(PersonDto input);

        Task<bool> Update(PersonDto input);

        Task<bool> Delete(PersonDto input);

        Task<List<PersonDto>> GetAll();
    }
}