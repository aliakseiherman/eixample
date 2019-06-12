using Autofac;
using AutoMapper;
using eixample.Application;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using eixample.Miscellaneous;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace eixample.Autofac
{
    public class DefaultModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var mapperConfiguration = new MapperConfiguration(cfg => cfg.AddProfile(new AutoMapperProfileConfiguration()));
            var mapper = mapperConfiguration.CreateMapper();
            builder.Register(c => mapper).As<IMapper>().SingleInstance();

            var appConfiguration = AppConfig.Get(FolderFinder.FetchRoot());
            builder.Register(c => appConfiguration).As<IConfigurationRoot>().SingleInstance();

            builder.RegisterType<HttpContextAccessor>().As<IHttpContextAccessor>().SingleInstance();

            builder
                .RegisterType<AppDbContext>()
                .WithParameter("options", DbContextOptionsBuilder.Get())
                .InstancePerLifetimeScope();

            builder.RegisterType<Session>().InstancePerLifetimeScope();
            builder.RegisterType<TenantService>().As<ITenantService>().InstancePerLifetimeScope();
            builder.RegisterType<UserManager<ApplicationUser>>().InstancePerLifetimeScope();
            builder.RegisterType<UserService>().As<IUserService>().InstancePerLifetimeScope();
            builder.RegisterType<MembershipService>().As<IMembershipService>().InstancePerLifetimeScope();
            builder.RegisterType<PersonService>().As<IPersonService>().InstancePerLifetimeScope();
        }
    }
}
