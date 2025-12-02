using PetjadesApi.Models;

namespace PetjadesApi.Repositories
{
    public interface IAnimalRepository
    {
        Task<List<Animal>> GetAllAsync();
        Task<Animal?> GetByIdAsync(int id);
        Task<Animal> CreateAsync(Animal animal);
    }
}
