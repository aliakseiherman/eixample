using eixample.Application;
using eixample.Entities;
using eixample.EntityFrameworkCore;
using eixample.Extensions;
using eixample.Host.Filters;
using eixample.Host.Middleware;
using eixample.Miscellaneous;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

var configuration = AppConfig.Get(FolderFinder.FetchRoot());

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(AutoMapperProfileConfiguration));

builder.Services.AddSingleton<IConfigurationRoot>(configuration as IConfigurationRoot);
builder.Services.AddDbContext<AppDbContext>(options => options.ConfigureNoLazyLoading(), ServiceLifetime.Scoped);
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<Session>();
builder.Services.AddTransient<UserManager<ApplicationUser>>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ITenantService, TenantService>();
builder.Services.AddTransient<IMembershipService, MembershipService>();
builder.Services.AddTransient<IItemService, ItemService>();

builder.Services
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

builder.Services
                .AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

builder.Services.AddDistributedMemoryCache();

builder.Services.AddCors(
    options => options.AddPolicy(
        configuration.GetDefaultPolicy(),
        policyBuilder =>
        {
            policyBuilder
                .WithOrigins(configuration.GetCorsOrigins())
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }));

builder.Services.AddAuthentication(options =>
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
                        IssuerSigningKey = configuration.GetSymmetricSecurityKey(),
                        ValidAudience = configuration.GetValidAudience(),
                        ValidIssuer = configuration.GetValidIssuer()
                    };
                });

builder.Services.AddAuthorization(auth =>
{
    auth.AddPolicy(
        configuration.GetDefaultPolicy(),
        new AuthorizationPolicyBuilder()
            .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
            .RequireAuthenticatedUser()
            .Build()
    );
});

builder.WebHost.UseContentRoot(Directory.GetCurrentDirectory());

var app = builder.Build();

app.SeedData();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionHandleMiddleware>();

app.UseCors(configuration.GetDefaultPolicy());

app.UseAuthentication();

app.MapControllers();

app.UseMvc();

app.Run();
