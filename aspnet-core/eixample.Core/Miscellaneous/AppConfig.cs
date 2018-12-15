using eixample.Extensions;
using Microsoft.Extensions.Configuration;
using System.Collections.Concurrent;

namespace eixample.Miscellaneous
{
    public class AppConfig
    {
        private static readonly ConcurrentDictionary<string, IConfigurationRoot> _cache;

        static AppConfig()
        {
            _cache = new ConcurrentDictionary<string, IConfigurationRoot>();
        }

        public static IConfigurationRoot Get(string path, string envName = null, bool secretsRequired = false)
        {
            var key = path + "#" + envName + "#" + secretsRequired;
            return _cache.GetOrAdd(
                key,
                _ => Build(path, envName, secretsRequired)
            );
        }

        private static IConfigurationRoot Build(string path, string envName = null, bool secretsRequired = false)
        {
            var configBuilder = new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            if (!envName.IsNullOrWhiteSpace())
            {
                configBuilder = configBuilder.AddJsonFile($"appsettings.{envName}.json", optional: true);
            }

            configBuilder = configBuilder.AddEnvironmentVariables();

            if (secretsRequired)
            {
                configBuilder.AddUserSecrets(typeof(AppConfig).GetAssembly());
            }

            return configBuilder.Build();
        }
    }
}
