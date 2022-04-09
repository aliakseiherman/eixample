namespace eixample.Consts
{
    public static class SetupConsts
    {
        public static class Tenants
        {
            public static class Subdomain1
            {
                public const string Name = "Company 1";
                public const string HostName = "subdomain1";
            }

            public static class Subdomain2
            {
                public const string Name = "Company 2";
                public const string HostName = "subdomain2";
            }
        }

        public static class Users
        {
            public static class AdminJoe
            {
                public const string FirstName = "Joe";
                public const string LastName = "Admin";
                public const string UserName = "admin";
                public const string Email = "joe.admin@live.com";
            }

            public static class JohnDoe
            {
                public const string FirstName = "John";
                public const string LastName = "Doe";
                public const string UserName = "johndoe";
                public const string Email = "john.doe@live.com";
            }

            public static class Passwords
            {
                public const string Default = "123qwe";
            }
        }
    }
}
