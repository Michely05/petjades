using Microsoft.EntityFrameworkCore;
using PetjadesApi.Dtos;
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

    public async Task<Animal?> UpdateAnimal(Animal animal)
    {
        _db.Animals.Update(animal);
        await _db.SaveChangesAsync();
        return animal;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var animal = await _db.Animals.FindAsync(id);
        if (animal == null)
            return false;

        _db.Animals.Remove(animal);
        await _db.SaveChangesAsync();
        return true;
    }

}
