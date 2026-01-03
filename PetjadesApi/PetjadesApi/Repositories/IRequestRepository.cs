using PetjadesApi.Dtos;
using PetjadesApi.Models;

namespace PetjadesApi.Repositories
{
    public interface IRequestRepository
    {
        Task<List<Request>> GetAllAsync();
        Task<Request?> GetByIdAsync(int id);
        Task<Request> CreateAsync(Request request);
        Task UpdateAsync(Request request);
    }
}
