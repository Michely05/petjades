using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PetjadesApi;
using PetjadesApi.Repositories;
using PetjadesApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddScoped<IAnimalRepository, AnimalRepository>();
builder.Services.AddScoped<IAnimalService, AnimalService>();

builder.Services.AddScoped<IRequestRepository, RequestRepository>();
builder.Services.AddScoped<IRequestService, RequestService>();

builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGroup("/identity").MapIdentityApi<IdentityUser>();

app.Run();
