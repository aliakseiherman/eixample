using System;

namespace eixample.Entities
{
    public interface IHasDeletionTime
    {
        DateTime? DeletionTime { get; set; }
    }
}
