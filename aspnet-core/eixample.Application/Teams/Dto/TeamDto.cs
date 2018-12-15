using System;

namespace eixample.Dto
{
    public class TeamDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
