using PetjadesApi.Models;

namespace PetjadesApi.Services;

public interface IAnimalService
{
    Task<List<Animal>> GetAllAsync();
    Task<Animal?> GetByIdAsync(int id);
    Task<Animal> CreateAsync(Animal animal);
}
