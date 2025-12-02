using Microsoft.AspNetCore.Mvc;
using PetjadesApi.Models;
using PetjadesApi.Services;

namespace PetjadesApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnimalsController : ControllerBase
{
    private readonly IAnimalService _service;

    public AnimalsController(IAnimalService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Create(Animal animal)
    {
        var created = await _service.CreateAsync(animal);
        return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
    }
}
