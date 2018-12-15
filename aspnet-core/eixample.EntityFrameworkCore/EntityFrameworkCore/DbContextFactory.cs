using eixample.Consts;
using eixample.Miscellaneous;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace eixample.EntityFrameworkCore.EntityFrameworkCore
{
    public class DbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            var configuration = AppConfig.Get(FolderFinder.FetchRoot());

            DbContextConfigurer.Configure(builder, configuration.GetConnectionString(AppConsts.ConnectionStringName));

            return new AppDbContext(builder.Options);
        }
    }
}
