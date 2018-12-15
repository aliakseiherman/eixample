using eixample.Entities;

namespace eixample.Application
{
    public interface IMembershipService
    {
        bool IsMember(string userId);

        void CreateMembership(ApplicationUser user);
    }
}