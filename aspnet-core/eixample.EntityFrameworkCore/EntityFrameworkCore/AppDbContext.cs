using eixample.Entities;
using eixample.Extensions;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace eixample.EntityFrameworkCore.EntityFrameworkCore
{
    public class AppDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public string UserId { get; set; }
        public int? TenantId { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Tenant> Tenants { get; set; }

        public DbSet<Membership> Memberships { get; set; }

        public DbSet<Person> Persons { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.NamesToSnakeCase(); // PostgreSQL
            modelBuilder.EnableSoftDelete();
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            ChangeTracker.ProcessModification(UserId);
            ChangeTracker.ProcessDeletion(UserId);
            ChangeTracker.ProcessCreation(UserId, TenantId);

            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            ChangeTracker.DetectChanges();
            ChangeTracker.ProcessModification(UserId);
            ChangeTracker.ProcessDeletion(UserId);
            ChangeTracker.ProcessCreation(UserId, TenantId);

            return (await base.SaveChangesAsync(true, cancellationToken));
        }
    }
}
