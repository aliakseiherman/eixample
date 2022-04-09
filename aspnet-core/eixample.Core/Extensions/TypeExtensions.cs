using System.Reflection;

namespace eixample.Extensions
{
    public static class TypeExtensions
    {
        public static Assembly GetAssembly(this Type type)
        {
            var result = type.GetTypeInfo().Assembly;
            return result;
        }
    }
}
