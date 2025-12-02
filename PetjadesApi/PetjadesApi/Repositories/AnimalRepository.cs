using Microsoft.EntityFrameworkCore;
using PetjadesApi.Models;

namespace PetjadesApi.Repositories;

public class AnimalRepository : IAnimalRepository
{
    private readonly ApplicationDbContext _db;

    public AnimalRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<List<Animal>> GetAllAsync() =>
        await _db.Animals.ToListAsync();

    public async Task<Animal?> GetByIdAsync(int id) =>
        await _db.Animals.FindAsync(id);

    public async Task<Animal> CreateAsync(Animal animal)
    {
        _db.Animals.Add(animal);
        await _db.SaveChangesAsync();
        return animal;
    }
}
