using Microsoft.AspNetCore.Mvc;
using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Services;

namespace PetjadesApi.Controllers;

[ApiController]
[Route("requests")]
public class RequestController : ControllerBase
{
    private readonly IRequestService _RequestService;

    public RequestController(IRequestService service)
    {
        _RequestService = service;
    }

    [HttpPost]
    public async Task<IActionResult> Create(Request request)
    {
        await _RequestService.CreateAsync(request);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var requests = await _RequestService.GetAllAsync();
        return Ok(requests);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var request = await _RequestService.GetByIdAsync(id);

        if (request == null) return NotFound();

        return Ok(new RequestDetailDto
        {
            Id = request.Id,
            Nom = request.Nom,
            Email = request.Email,
            Tipus = request.Tipus,
            Missatge = request.Missatge,
            AnimalNom = request.Animal != null ? request.Animal.Nom : null,
            Resposta = request.Resposta
        });
    }

    // Responder solicitud
    [HttpPost("{id}/reply")]
    public async Task<IActionResult> Reply(int id, [FromBody] ReplyRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Resposta))
        {
            return BadRequest("La resposta no pot estar buida");
        }

        var ok = await _RequestService.ReplyAsync(id, dto.Resposta);

        if (!ok) return NotFound();

        return Ok();
    }
}
