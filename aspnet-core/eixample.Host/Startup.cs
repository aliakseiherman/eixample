using Autofac;
using Autofac.Extensions.DependencyInjection;
using eixample.Autofac;
using eixample.Entities;
using eixample.EntityFrameworkCore.EntityFrameworkCore;
using eixample.Extensions;
using eixample.Host.Controllers;
using eixample.Host.Filters;
using eixample.Host.Middleware;
using eixample.Miscellaneous;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.AspNetCore;
using NSwag.SwaggerGeneration.Processors.Security;
using System;
using System.Reflection;
using Newtonsoft.Json.Serialization;

namespace eixample.Host
{
    public class Startup
    {
        private IConfiguration _configuration { get; }

        public Startup()
        {
            _configuration = AppConfig.Get(FolderFinder.FetchRoot());
        }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc(options =>
                {
                    options.EnableEndpointRouting = false;
                    options.Filters.Add(typeof(MultiTenancyFilter));
                })
                .AddNewtonsoftJson(o =>
                {
                    o.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                })
                .AddSessionStateTempDataProvider();

            
            services
                .AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.AddDistributedMemoryCache();

            services.AddCors(
                options => options.AddPolicy(_configuration.GetDefaultPolicy(),
                builder => builder
                    .WithOrigins(_configuration.GetCorsOrigins())
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                ));

            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = _configuration.GetSymmetricSecurityKey(),
                        ValidAudience = _configuration.GetValidAudience(),
                        ValidIssuer = _configuration.GetValidIssuer()
                    };
                });

            services.AddAuthorization(auth =>
            {
                auth
                .AddPolicy(
                    _configuration.GetDefaultPolicy(),
                    new AuthorizationPolicyBuilder()
                        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
                        .RequireAuthenticatedUser().Build()
                );
            });

            services.AddSwagger();

            services.AddEntityFrameworkNpgsql();

            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterModule<DefaultModule>();
            containerBuilder.Populate(services);
            containerBuilder.RegisterType<AccountController>();
            containerBuilder.RegisterType<SessionController>();
            containerBuilder.RegisterType<AuthController>();
            containerBuilder.RegisterType<PersonController>();
            var container = containerBuilder.Build();
            return new AutofacServiceProvider(container);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseSwaggerUi3(typeof(Startup).GetTypeInfo().Assembly, swaggerSettings =>
            {
                swaggerSettings.GeneratorSettings.OperationProcessors.Add(new OperationSecurityScopeProcessor("JWT Token"));

                swaggerSettings.GeneratorSettings.DocumentProcessors.Add(
                    new SecurityDefinitionAppender("JWT Token", new SwaggerSecurityScheme
                    {
                        Type = SwaggerSecuritySchemeType.ApiKey,
                        Name = "Authorization",
                        Description = "JWT Token Authorization",
                        In = SwaggerSecurityApiKeyLocation.Header
                    }));
            });

            app.UseMiddleware<ExceptionHandleMiddleware>();

            app.UseSwagger();
            app.UseSwaggerUi3();

            app.UseCors(_configuration.GetDefaultPolicy());

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
