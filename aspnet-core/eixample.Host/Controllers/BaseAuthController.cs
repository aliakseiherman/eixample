using eixample.Application;
using eixample.Consts;
using eixample.Entities;
using eixample.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace eixample.Host.Controllers
{
    public class BaseAuthController : Controller
    {
        protected Session Session;
        protected IConfigurationRoot Config;

        public BaseAuthController(
            Session session,
            IConfigurationRoot config
            )
        {
            Session = session;
            Config = config;
        }

        public string GetAuthToken(ApplicationUser user, DateTime expires)
        {
            string strTenantId = Session.TenantId.HasValue ? Session.TenantId.ToString() : string.Empty;

            var tokenHandler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Expires = expires,
                Issuer = Config.GetValidIssuer(),
                Audience = Config.GetValidAudience(),
                SigningCredentials = new SigningCredentials(Config.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(CustomClaims.TenantId, strTenantId)
                })
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}