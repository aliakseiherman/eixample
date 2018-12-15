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
                entity.Relational().TableName = entity.Relational().TableName.ToSnakeCase();

                foreach (var property in entity.GetProperties())
                {
                    property.Relational().ColumnName = property.Name.ToSnakeCase();
                }

                foreach (var key in entity.GetKeys())
                {
                    key.Relational().Name = key.Relational().Name.ToSnakeCase();
                }

                foreach (var key in entity.GetForeignKeys())
                {
                    key.Relational().Name = key.Relational().Name.ToSnakeCase();
                }

                foreach (var index in entity.GetIndexes())
                {
                    index.Relational().Name = index.Relational().Name.ToSnakeCase();
                }
            }
        }

        public static void EnableSoftDelete(this ModelBuilder modelBuilder)
        {
            foreach (var type in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(ISoftDelete).IsAssignableFrom(type.ClrType) && (type.BaseType == null || !typeof(ISoftDelete).IsAssignableFrom(type.BaseType.ClrType)))
                {
                    modelBuilder.SetSoftDeleteFilter(type.ClrType);
                }
            }
        }
    }
}
