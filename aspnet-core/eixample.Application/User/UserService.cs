using eixample.Dto;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace eixample.Application
{
    public class UserService : IUserService
    {
        private AppDbContext _dbContext;
        private UserManager<ApplicationUser> _userManager;
        private IMembershipService _membershipService;

        public UserService(
            AppDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            IMembershipService membershipService
            )
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _membershipService = membershipService;
        }

        public async Task<ApplicationUser> Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return null;
            }

            var user = _dbContext.Users.SingleOrDefault(x => x.UserName == username);

            if (user == null)
            {
                throw new Exception("No such user.");
            }

            if (!_membershipService.IsMember(user.Id))
            {
                throw new Exception("Not a member of current tenant. Registration required.");
            }

            bool correctPassword = await _userManager.CheckPasswordAsync(user, password);

            if (!correctPassword)
            {
                throw new Exception("Incorrect password.");
            }

            return user;
        }

        public async Task<ApplicationUser> Create(CreateUserInput input)
        {
            var user = await _userManager.FindByEmailAsync(input.Email);

            if (user == null)
            {
                user = new ApplicationUser()
                {
                    FirstName = input.FirstName,
                    LastName = input.LastName,
                    UserName = input.UserName,
                    Email = input.Email,
                };

                var result = await _userManager.CreateAsync(user, input.Password);

                if (result.Succeeded)
                {
                    user = await _userManager.FindByNameAsync(input.UserName);
                    _membershipService.CreateMembership(user);
                }
                else
                {
                    throw new Exception($"{string.Join("\n", result.Errors.Select(x => x.Description))}");
                }
            }
            else
            {
                bool correctPassword = await _userManager.CheckPasswordAsync(user, input.Password);

                if (correctPassword)
                {
                    _membershipService.CreateMembership(user);
                }
            }

            return user;
        }
    }
}
