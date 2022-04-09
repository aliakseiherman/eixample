using eixample.Application;
using eixample.Consts;
using eixample.Entities;
using eixample.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace eixample.SeedData
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

            ApplicationUser secondaryUser = _context.Users.FirstOrDefault(x => x.UserName.Equals(SetupConsts.Users.JohnDoe.UserName));

            if (secondaryUser == null)
            {
                secondaryUser = new ApplicationUser()
                {
                    FirstName = SetupConsts.Users.JohnDoe.FirstName,
                    LastName = SetupConsts.Users.JohnDoe.LastName,
                    UserName = SetupConsts.Users.JohnDoe.UserName,
                    Email = SetupConsts.Users.JohnDoe.Email,
                    EmailConfirmed = true,
                    PasswordHash = new PasswordHasher<ApplicationUser>().HashPassword(secondaryUser, SetupConsts.Users.Passwords.Default)
                };

                _userManager.CreateAsync(secondaryUser).ConfigureAwait(false).GetAwaiter().GetResult();
            }
        }
    }
}
