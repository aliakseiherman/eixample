using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace eixample.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public virtual ICollection<Membership> Memberships { get; set; }
    }
}
