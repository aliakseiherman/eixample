using AutoMapper;
using eixample.Dto;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eixample.Application
{
    public class TeamService : ITeamService
    {
        private AppDbContext _dbContext;
        private IMapper _mapper;
        private Session _session;

        public TeamService(
            AppDbContext dbContext,
            IMapper mapper,
            Session session
            )
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _session = session;
        }

        public async Task<bool> Add(TeamDto input)
        {
            var team = new Team();
            _mapper.Map(input, team);
            _dbContext.Teams.Add(team);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<bool> Update(TeamDto input)
        {
            var team = _dbContext.Teams.Single(x => x.Id == input.Id);
            _mapper.Map(input, team);
            _dbContext.Teams.Update(team);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<bool> Delete(TeamDto input)
        {
            var team = _dbContext.Teams.Single(x => x.Id == input.Id);
            _dbContext.Teams.Remove(team);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<List<TeamDto>> GetAll()
        {
            var teams = _dbContext.Teams.Where(x => x.TenantId == _session.TenantId.GetValueOrDefault()).ToList();
            var dtos = _mapper.Map<List<TeamDto>>(teams);
            return await Task.FromResult(dtos);
        }
    }
}
