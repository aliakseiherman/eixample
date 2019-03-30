using eixample.Consts;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Linq;

namespace eixample.Application.SeedData
{
    public class UserCreator
    {
        private AppDbContext _context;
        private ITenantService _tenantService;
        private UserManager<ApplicationUser> _userManager;

        public UserCreator(
            AppDbContext context,
            ITenantService tenantService,
            UserManager<ApplicationUser> userManager
            )
        {
            _context = context;
            _tenantService = tenantService;
            _userManager = userManager;
        }

        public void Create()
        {
            CreateUsers();
        }

        private void CreateUsers()
        {
            ApplicationUser hostAdminUser = _context.Users.FirstOrDefault(x => x.UserName.Equals(SetupConsts.Users.AdminJoe.UserName));

            if (hostAdminUser == null)
            {
                hostAdminUser = new ApplicationUser()
                {
                    FirstName = SetupConsts.Users.AdminJoe.FirstName,
                    LastName = SetupConsts.Users.AdminJoe.LastName,
                    UserName = SetupConsts.Users.AdminJoe.UserName,
                    Email = SetupConsts.Users.AdminJoe.Email,
                    EmailConfirmed = true,
                    PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(hostAdminUser, SetupConsts.Users.Passwords.Default)
                };

                _userManager.CreateAsync(hostAdminUser).ConfigureAwait(false).GetAwaiter().GetResult();
            }

            ApplicationUser secondaryUser = _context.Users.FirstOrDefault(x => x.UserName.Equals(SetupConsts.Users.JohnRoe.UserName));

            if (secondaryUser == null)
            {
                secondaryUser = new ApplicationUser()
                {
                    FirstName = SetupConsts.Users.JohnRoe.FirstName,
                    LastName = SetupConsts.Users.JohnRoe.LastName,
                    UserName = SetupConsts.Users.JohnRoe.UserName,
                    Email = SetupConsts.Users.JohnRoe.Email,
                    EmailConfirmed = true,
                    PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(secondaryUser, SetupConsts.Users.Passwords.Default)
                };

                _userManager.CreateAsync(secondaryUser).ConfigureAwait(false).GetAwaiter().GetResult();
            }
        }
    }
}
