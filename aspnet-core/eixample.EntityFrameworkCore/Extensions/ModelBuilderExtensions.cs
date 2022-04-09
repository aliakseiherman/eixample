using eixample.Entities;
using Microsoft.EntityFrameworkCore;

namespace eixample.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void NamesToSnakeCase(this ModelBuilder modelBuilder)
        {
            foreach (var entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.SetTableName(entity.GetTableName()?.ToSnakeCase().ToLower());

                foreach (var property in entity.GetProperties())
                {
                    property.SetColumnName(property.Name?.ToSnakeCase().ToLower());
                }

                foreach (var key in entity.GetKeys())
                {
                    key.SetName(key.GetName()?.ToSnakeCase().ToLower());
                }

                foreach (var key in entity.GetForeignKeys())
                {
                    key.SetConstraintName(key.GetConstraintName()?.ToSnakeCase().ToLower());
                }

                foreach (var index in entity.GetIndexes())
                {
                    index?.SetDatabaseName(index.GetDatabaseName()?.ToSnakeCase().ToLower());
                }
            }
        }
    }
}
