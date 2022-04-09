using System.Reflection;

namespace eixample.Miscellaneous
{
    public static class FolderFinder
    {
        public static string FetchRoot()
        {
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (path == null)
            {
                throw new Exception("eixample.Core not found");
            }

            var dirInfo = new DirectoryInfo(path);

            while (!Contains(dirInfo.FullName, "eixample.sln"))
            {
                if (dirInfo.Parent == null)
                {
                    throw new Exception("Root not found");
                }

                dirInfo = dirInfo.Parent;
            }

            var hostPath = Path.Combine(dirInfo.FullName, "eixample.Host");

            if (Directory.Exists(hostPath))
            {
                return hostPath;
            }

            throw new Exception("Root not found.");
        }

        private static bool Contains(string dirname, string filename)
        {
            return Directory.GetFiles(dirname).Any(filePath => string.Equals(Path.GetFileName(filePath), filename));
        }
    }
}
