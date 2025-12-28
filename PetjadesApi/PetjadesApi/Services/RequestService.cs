using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Repositories;

namespace PetjadesApi.Services;

public class RequestService : IRequestService
{
    private readonly IRequestRepository _repo;
    private readonly IEmailService _email;

    public RequestService(IRequestRepository repo, IEmailService email)
    {
        _repo = repo;
        _email = email;
    }

    public async Task<List<RequestListDto>> GetAllAsync() 
    {
        var requests = await _repo.GetAllAsync();

        return requests.Select(r => new RequestListDto
        {
            Id = r.Id,
            Nom = r.Nom,
            Email = r.Email,
            Tipus = r.Tipus,
            AnimalNom = r.Animal?.Nom,
            RespostaEnviada = r.RespostaEnviada
        }).ToList();
    }

    public Task<Request> CreateAsync(Request request) =>
        _repo.CreateAsync(request);

    public async Task<bool> ReplyAsync(int id, string resposta)
    {
        var request = await _repo.GetByIdAsync(id);
        if (request == null) return false;

        request.Resposta = resposta;
        request.RespostaEnviada = true;

        await _repo.UpdateAsync(request);

        await _email.SendAsync(
            request.Email,
            "Resposta a la teva sol·licitud – Petjades",
            resposta
        );

        return true;
    }
}
