using System;

namespace eixample.Entities
{
    public interface ISoftDelete
    {
        bool IsDeleted { get; set; }
    }
}
