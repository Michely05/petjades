using PetjadesApi.Dtos;
using PetjadesApi.Models;

namespace PetjadesApi.Services;

public interface IRequestService

{
    Task<List<RequestListDto>> GetAllAsync();
    Task<Request> CreateAsync(Request request);
    Task<bool> ReplyAsync(int id, string resposta);
}
