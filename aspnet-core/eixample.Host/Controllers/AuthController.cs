using eixample.Application;
using eixample.Host.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eixample.Host.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : BaseAuthController
    {
        private IUserService _userService;

        public AuthController(
            IConfigurationRoot config,
            IUserService userService,
            Session session
            ) : base(
                session,
                config
                )
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<AuthenticateOutput> Authenticate([FromBody] AuthenticateInput input)
        {
            var expires = input.RememberMe ? DateTime.UtcNow.AddDays(30) : DateTime.UtcNow.AddMinutes(30);

            var user = await _userService.Authenticate(input.UserName, input.Password);

            if (user == null)
            {
                throw new Exception("Unauthorised");
            }

            string token = GetAuthToken(user, expires);

            return new AuthenticateOutput() { Token = token };
        }
    }
}