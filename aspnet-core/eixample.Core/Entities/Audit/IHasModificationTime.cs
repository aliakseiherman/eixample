using System;

namespace eixample.Entities
{
    public interface IHasModificationTime
    {
        DateTime? ModificationTime { get; set; }
    }
}
