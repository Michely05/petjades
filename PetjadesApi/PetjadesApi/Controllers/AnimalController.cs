using Microsoft.AspNetCore.Mvc;
using PetjadesApi.Models;
using PetjadesApi.Services;

namespace PetjadesApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AnimalsController : ControllerBase
{
    private readonly IAnimalService _AnimalService;

    public AnimalsController(IAnimalService service)
    {
        _AnimalService = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var animals = await _AnimalService.GetAllAsync();
        return Ok(animals);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Animal animal)
    {
        var created = await _AnimalService.CreateAsync(animal);
        return Created($"/animals/{created.Id}", created);
    }
}
