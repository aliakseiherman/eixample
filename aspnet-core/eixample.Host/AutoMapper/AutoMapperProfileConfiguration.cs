using AutoMapper;
using eixample.Dto;
using eixample.Entities;

namespace eixample.Miscellaneous
{
    public class AutoMapperProfileConfiguration : Profile
    {
        public AutoMapperProfileConfiguration()
        {
            CreateMap<TeamDto, Team>();
        }
    }
}
