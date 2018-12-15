using eixample.Application.SeedData;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace eixample.Host
{
    public class Program
    {
        static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            host.SeedData();
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
