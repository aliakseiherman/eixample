using eixample.Consts;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Threading.Tasks;

namespace eixample.Application.SeedData
{
    public class UserCreator
    {
        private AppDbContext _context;
        private ITenantService _tenantService;
        private UserManager<ApplicationUser> _userManager;
        private RoleStore<IdentityRole> _roleStore;

        public UserCreator(IServiceScope scope)
        {
            _context = scope.ServiceProvider.GetService<AppDbContext>();
            _tenantService = scope.ServiceProvider.GetService<ITenantService>();
            _userManager = scope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
            _roleStore = new RoleStore<IdentityRole>(_context);
        }

        public void Create()
        {
            Task.Run(async () => await CreateUsers()).ConfigureAwait(false).GetAwaiter().GetResult();
        }

        private async Task CreateUsers()
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

                await _userManager.CreateAsync(hostAdminUser);
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

                await _userManager.CreateAsync(secondaryUser);
            }
        }
    }
}
