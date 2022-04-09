using eixample.Application;
using eixample.Entities;
using eixample.EntityFrameworkCore;
using eixample.SeedData;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace eixample.Tests.Integration
{
    public class TestBase
    {
        protected AppDbContext DbContext;
        protected UserManager<ApplicationUser> UserManager;
        protected ITenantService TenantService;

        public TestBase()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            DbContext = new AppDbContext(options);
            var userStore = new UserStore<ApplicationUser>(DbContext);
            UserManager = new UserManager<ApplicationUser>(userStore, null, null, null, null, null, null, null, null);
            TenantService = new TenantService(DbContext);

            new TenantsCreator(DbContext).Create();
            new UserCreator(DbContext, TenantService, UserManager).Create();
            new MembershipCreator(DbContext, UserManager).Create();
        }
    }
}
