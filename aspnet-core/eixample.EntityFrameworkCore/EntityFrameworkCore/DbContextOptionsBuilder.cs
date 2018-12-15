using eixample.Consts;
using eixample.Miscellaneous;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace eixample.EntityFrameworkCore.EntityFrameworkCore
{
    public class DbContextOptionsBuilder
    {
        public static DbContextOptions<AppDbContext> Get()
        {
            var configuration = AppConfig.Get(FolderFinder.FetchRoot());

            var builder = new DbContextOptionsBuilder<AppDbContext>();
            DbContextConfigurer.Configure(builder, configuration.GetConnectionString(AppConsts.ConnectionStringName));

            return builder.Options;
        }
    }
}
