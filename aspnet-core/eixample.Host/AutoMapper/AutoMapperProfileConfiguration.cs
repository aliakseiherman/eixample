using AutoMapper;
using eixample.Dto;
using eixample.Entities;

namespace eixample.Miscellaneous
{
    public class AutoMapperProfileConfiguration : Profile
    {
        public AutoMapperProfileConfiguration()
        {
            CreateMap<ApplicationUser, UserDto>();
            CreateMap<UserDto, ApplicationUser>();
            CreateMap<Item, ItemDto>();
            CreateMap<ItemDto, Item>();
            CreateMap<Tenant, TenantDto>();
        }
    }
}
