using eixample.Consts;
using eixample.Miscellaneous;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace eixample.Extensions
{
    public static class DbContextOptionsBuilderExtensions
    {
        public static void Configure(this DbContextOptionsBuilder options)
        {
            var configuration = AppConfig.Get(FolderFinder.FetchRoot());
            string connString = configuration.GetConnectionString(AppConsts.ConnectionStringName);

            options.UseNpgsql(connString).UseLazyLoadingProxies();
        }

        public static void ConfigureNoLazyLoading(this DbContextOptionsBuilder options)
        {
            var configuration = AppConfig.Get(FolderFinder.FetchRoot());
            string connString = configuration.GetConnectionString(AppConsts.ConnectionStringName);

            options.UseNpgsql(connString);
        }
    }
}
