using eixample.Application;
using eixample.Consts;
using System.Linq;
using Xunit;

namespace eixample.Tests.Integration
{
    public class Membership_Tests : TestBase
    {
        [Fact]
        public void Should_Reject_Users_Without_Membership_On_Current_Tenant()
        {
            var tenant = DbContext.Tenants.Single(x => x.HostName == SetupConsts.Tenants.Restaura.HostName);
            var adminJoe = DbContext.Users.Single(x => x.UserName == SetupConsts.Users.AdminJoe.UserName);
            var johnRoe = DbContext.Users.Single(x => x.UserName == SetupConsts.Users.JohnRoe.UserName);

            DbContext.UserId = adminJoe.Id;
            DbContext.TenantId = tenant.Id;

            var session = new Session() { TenantId = DbContext.TenantId, UserId = DbContext.UserId };

            var membershipService = new MembershipService(DbContext, session);

            Assert.True(membershipService.IsMember(adminJoe.Id));
            Assert.True(!membershipService.IsMember(johnRoe.Id)); // not a member of 'restaura'
        }
    }
}
