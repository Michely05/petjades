using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PetjadesApi;
using PetjadesApi.Models;
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

builder.Services.AddScoped<IAnimalRepository, AnimalRepository>();
builder.Services.AddScoped<IAnimalService, AnimalService>();

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
app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("/identity").MapIdentityApi<IdentityUser>();

// CREATE ANIMAL
app.MapPost("/animals", async (Animal animal, ApplicationDbContext db) =>
{
    db.Animals.Add(animal);
    await db.SaveChangesAsync();
    return Results.Created($"/animals/{animal.Id}", animal);
});
//.RequireAuthorization();

// GET ALL ANIMALS
app.MapGet("/animals", async (ApplicationDbContext db) =>
{
    return await db.Animals.ToListAsync();
});
//.RequireAuthorization();

app.Run();
