using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace eixample.Extensions
{
    public static class ConfigurationExtensions
    {
        public static string GetIssuerSigningKey(this IConfiguration configuration)
        {
            string result = configuration["Authentication:JwtBearer:SecurityKey"];
            return result;
        }

        public static string GetValidIssuer(this IConfiguration configuration)
        {
            string result = configuration["Authentication:JwtBearer:Issuer"];
            return result;
        }

        public static string GetValidAudience(this IConfiguration configuration)
        {
            string result = configuration["Authentication:JwtBearer:Audience"];
            return result;
        }

        public static string GetDefaultPolicy(this IConfiguration configuration)
        {
            string result = configuration["Policies:Default"];
            return result;
        }

        public static SymmetricSecurityKey GetSymmetricSecurityKey(this IConfiguration configuration)
        {
            var issuerSigningKey = configuration.GetIssuerSigningKey();
            var data = Encoding.UTF8.GetBytes(issuerSigningKey);
            var result = new SymmetricSecurityKey(data);
            return result;
        }

        public static string[] GetCorsOrigins(this IConfiguration configuration)
        {
            string[] result =
                configuration["App:CorsOrigins"]
                .Split(",", StringSplitOptions.RemoveEmptyEntries)
                .ToArray();

            return result;
        }
    }
}
