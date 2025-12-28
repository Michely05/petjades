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

    // Listar solicitudes (dashboard)
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var requests = await _RequestService.GetAllAsync();
        return Ok(requests);
    }

    // Responder solicitud
    [HttpPost("{id}/reply")]
    public async Task<IActionResult> Reply(int id, [FromBody] ReplyDto dto)
    {
        var ok = await _RequestService.ReplyAsync(id, dto.Resposta);
        if (!ok) return NotFound();

        return Ok();
    }
}
