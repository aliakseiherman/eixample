namespace eixample.Extensions
{
    public static class HttpRequestExtensions
    {
        public static string GetSubDomain(this HttpRequest request)
        {
            string result = new Uri(request.Headers["Referer"]).GetSubDomain();
            return result;
        }
    }
}
