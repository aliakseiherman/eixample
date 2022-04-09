using AutoMapper;
using eixample.Application;
using eixample.Dto;
using eixample.Entities;
using eixample.EntityFrameworkCore;
using eixample.Host.Models.Session;
using Microsoft.AspNetCore.Mvc;

namespace eixample.Host.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private AppDbContext _dbContext;
        private IMapper _mapper;
        private Session _session;

        public SessionController(
            AppDbContext dbContext,
            IMapper mapper,
            Session session
            )
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _session = session;
        }

        [HttpGet]
        public async Task<GetCurrentLoginDetailsOutput> GetCurrentLoginDetails()
        {
            var output = new GetCurrentLoginDetailsOutput();
            output.User = GetUser();

            if (_session.TenantId.HasValue)
            {
                var tenant = _dbContext.Tenants.SingleOrDefault(x => x.Id == _session.TenantId);
                if (tenant != null)
                {
                    output.Tenant = _mapper.Map<Tenant, TenantDto>(tenant);
                }
            }

            return await Task.FromResult(output);
        }

        [HttpGet]
        public async Task<GetCurrentUserDataOutput> GetCurrentUserData()
        {
            var output = new GetCurrentUserDataOutput();
            output.User = GetUser();
            return await Task.FromResult(output);
        }

        private UserDto GetUser()
        {
            if (_session.UserId != null)
            {
                var user = _dbContext.Users.SingleOrDefault(x => x.Id == _session.UserId);
                if (user != null)
                {
                    var userDto = _mapper.Map<UserDto>(user);
                    return userDto;
                }
            }

            return null;
        }
    }
}