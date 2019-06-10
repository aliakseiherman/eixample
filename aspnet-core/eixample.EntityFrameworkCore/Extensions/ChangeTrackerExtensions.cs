using eixample.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Linq;

namespace eixample.Extensions
{
    public static class ChangeTrackerExtensions
    {
        public static void ProcessCreation(this ChangeTracker changeTracker, string userId, int? tenantId)
        {
            foreach (var item in changeTracker.Entries<IHasCreationTime>().Where(e => e.State == EntityState.Added))
            {
                item.Entity.CreationTime = DateTime.UtcNow;
            }

            foreach (var item in changeTracker.Entries<IHasCreator>().Where(e => e.State == EntityState.Added))
            {
                item.Entity.CreatorId = userId;
            }

            foreach (var item in changeTracker.Entries<IHasTenant>().Where(e => e.State == EntityState.Added))
            {
                if (tenantId.HasValue)
                {
                    item.Entity.TenantId = tenantId.Value;
                }
            }
        }

        public static void ProcessModification(this ChangeTracker changeTracker, string userId)
        {
            foreach (var item in changeTracker.Entries<IHasModificationTime>().Where(e => e.State == EntityState.Modified))
            {
                item.Entity.ModificationTime = DateTime.UtcNow;
            }

            foreach (var item in changeTracker.Entries<IHasModifier>().Where(e => e.State == EntityState.Modified))
            {
                item.Entity.ModifierId = userId;
            }
        }

        public static void ProcessDeletion(this ChangeTracker changeTracker, string userId)
        {
            foreach (var item in changeTracker.Entries<IHasDeletionTime>().Where(e => e.State == EntityState.Deleted))
            {
                item.Entity.DeletionTime = DateTime.UtcNow;
            }

            foreach (var item in changeTracker.Entries<IHasDeleter>().Where(e => e.State == EntityState.Deleted))
            {
                item.Entity.DeleterId = userId;
            }

            foreach (var item in changeTracker.Entries<ISoftDelete>().Where(e => e.State == EntityState.Deleted))
            {
                item.State = EntityState.Modified;
                item.Entity.IsDeleted = true;
            }
        }
    }
}
