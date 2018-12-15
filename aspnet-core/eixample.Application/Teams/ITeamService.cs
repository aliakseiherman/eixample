using eixample.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace eixample.Application
{
    public interface ITeamService
    {
        Task<bool> Add(TeamDto input);

        Task<bool> Update(TeamDto input);

        Task<bool> Delete(TeamDto input);

        Task<List<TeamDto>> GetAll();
    }
}