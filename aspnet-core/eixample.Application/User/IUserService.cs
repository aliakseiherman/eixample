using eixample.Dto;
using eixample.Entities;
using System.Threading.Tasks;

namespace eixample.Application
{
    public interface IUserService
    {
        Task<ApplicationUser> Authenticate(string username, string password);

        Task<ApplicationUser> Create(CreateUserInput input);
    }
}
