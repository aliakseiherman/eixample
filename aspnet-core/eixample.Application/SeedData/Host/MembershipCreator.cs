using eixample.Consts;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace eixample.Application.SeedData
{
    public class MembershipCreator
    {
        private readonly AppDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public MembershipCreator(
            AppDbContext context,
            UserManager<ApplicationUser> userManager
            )
        {
            _context = context;
            _userManager = userManager;
        }

        public void Create()
        {
            CreateMembership();
        }

        private void CreateMembership()
        {
            var users = _context.Users.ToList();
            var tenants = _context.Tenants.ToList();

            var hostAdminUser = _userManager.FindByNameAsync(SetupConsts.Users.AdminJoe.UserName).ConfigureAwait(false).GetAwaiter().GetResult();

            foreach (var tenant in tenants)
            {
                if (!_context.Memberships.Any(x => x.TenantId == tenant.Id && x.UserId == hostAdminUser.Id))
                {
                    _context.Memberships.Add(new Membership() { TenantId = tenant.Id, UserId = hostAdminUser.Id });
                }

                _context.SaveChanges();
            }

            // restricting John Roe from logging in to tenants other than 'galeriasenda'
            var johnRoe = _userManager.FindByNameAsync(SetupConsts.Users.JohnRoe.UserName).ConfigureAwait(false).GetAwaiter().GetResult();

            var firstTenant = _context.Tenants.Single(x => x.HostName == SetupConsts.Tenants.GaleriaSenda.HostName);

            if (!_context.Memberships.Any(x => x.TenantId == firstTenant.Id && x.UserId == johnRoe.Id))
            {
                _context.Memberships.Add(new Membership() { TenantId = firstTenant.Id, UserId = johnRoe.Id });
            }

            _context.SaveChanges();
        }
    }
}
