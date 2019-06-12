using AutoMapper;
using eixample.Dto;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eixample.Application
{
    public class PersonService : IPersonService
    {
        private AppDbContext _dbContext;
        private IMapper _mapper;
        private Session _session;

        public PersonService(
            AppDbContext dbContext,
            IMapper mapper,
            Session session
            )
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _session = session;
        }

        public async Task<bool> Add(PersonDto input)
        {
            var person = new Person();
            _mapper.Map(input, person);
            _dbContext.Persons.Add(person);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<bool> Update(PersonDto input)
        {
            var person = _dbContext.Persons.Single(x => x.Id == input.Id);
            _mapper.Map(input, person);
            _dbContext.Persons.Update(person);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<bool> Delete(PersonDto input)
        {
            var person = _dbContext.Persons.Single(x => x.Id == input.Id);
            _dbContext.Persons.Remove(person);
            _dbContext.SaveChanges();

            return await Task.FromResult(true);
        }

        public async Task<List<PersonDto>> GetAll()
        {
            var persons = _dbContext.Persons.Where(x => x.TenantId == _session.TenantId.GetValueOrDefault()).ToList();
            var dtos = _mapper.Map<List<PersonDto>>(persons);
            return await Task.FromResult(dtos);
        }
    }
}
