using eixample.Entities;
using eixample.EntityFrameworkCore;

namespace eixample.Application
{
    public class MembershipService : IMembershipService
    {
        private AppDbContext _dbContext;
        private Session _session;

        public MembershipService(
            AppDbContext dbContext,
            Session session
            )
        {
            _dbContext = dbContext;
            _session = session;
        }

        public bool IsMember(string userId)
        {
            if (_session.TenantId.HasValue)
            {
                bool isMember = _dbContext.Memberships.Any(x => x.TenantId == _session.TenantId && x.UserId == userId);

                if (!isMember)
                {
                    return false;
                }
            }

            return true;
        }

        public void CreateMembership(ApplicationUser user)
        {
            bool exists = _dbContext.Memberships.Any(x => x.TenantId == _session.TenantId && x.UserId == user.Id);

            if (!exists)
            {
                _dbContext.Memberships.Add(new Membership() { TenantId = _session.TenantId, UserId = user.Id });
                _dbContext.SaveChanges();
            }
        }
    }
}
