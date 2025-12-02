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
}
