using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace eixample.EntityFrameworkCore
{
    public class DbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<AppDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString).UseLazyLoadingProxies();
        }

        public static void Configure(Microsoft.EntityFrameworkCore.DbContextOptionsBuilder builder, string connectionString)
        {
            builder.UseNpgsql(connectionString).UseLazyLoadingProxies();
        }

        public static void Configure(DbContextOptionsBuilder<AppDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection).UseLazyLoadingProxies();
        }
    }
}
