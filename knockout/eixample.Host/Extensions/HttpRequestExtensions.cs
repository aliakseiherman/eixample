using eixample.Consts;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace eixample.Extensions
{
    public static class HttpRequestExtensions
    {
        public static string GetSubDomain(this HttpRequest request)
        {
            var parts = request.Host.Host.Split('.').ToList();

            if (parts.Any())
            {
                if (!parts.First().Equals(AppConsts.Host))
                {
                    return parts.First();
                }
            }

            return null;
        }
    }
}
