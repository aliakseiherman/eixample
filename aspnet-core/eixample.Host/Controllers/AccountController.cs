using AutoMapper;
using eixample.Application;
using eixample.Dto;
using eixample.Host.Models.Account;
using Microsoft.AspNetCore.Mvc;

namespace eixample.Host.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : BaseAuthController
    {
        private IUserService _userService;
        private IMapper _mapper;

        public AccountController(
            IConfigurationRoot config,
            IUserService userService,
            ITenantService tenantService,
            IMapper mapper,
            Session session
            ) : base(
                session,
                config
                )
        {
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<RegisterOutput> Register([FromBody] RegisterInput input)
        {
            var output = new RegisterOutput();

            var createUserInput = _mapper.Map<CreateUserInput>(input);

            var user = await _userService.Create(createUserInput);

            if (user != null)
            {
                output.Token = GetAuthToken(user, DateTime.UtcNow.AddDays(30));
            }

            return output;
        }
    }
}