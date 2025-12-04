using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Repositories;

namespace PetjadesApi.Services;

public class AnimalService : IAnimalService
{
    private readonly IAnimalRepository _repo;

    public AnimalService(IAnimalRepository repo)
    {
        _repo = repo;
    }

    public Task<List<Animal>> GetAllAsync() =>
        _repo.GetAllAsync();

    public Task<Animal?> GetByIdAsync(int id) =>
        _repo.GetByIdAsync(id);

    public Task<Animal> CreateAsync(Animal animal) =>
        _repo.CreateAsync(animal);

    public async Task<Animal?> UpdateAnimal(Animal animal)
    {
        return await _repo.UpdateAnimal(animal);
    }
    public async Task<bool> DeleteAsync(int id)
    {
        return await _repo.DeleteAsync(id);
    }

}
