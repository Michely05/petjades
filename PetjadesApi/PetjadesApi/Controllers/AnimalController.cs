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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var animal = await _AnimalService.GetByIdAsync(id);

        if (animal == null)
            return NotFound("Animal no trobat");

        return Ok(animal);
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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAnimal(int id, Animal animal)
    {
        var existing = await _AnimalService.GetByIdAsync(id);

        if (existing == null)
            return NotFound("Animal no trobat");

        existing.Nom = animal.Nom;
        existing.Especie = animal.Especie;
        existing.Genere = animal.Genere;
        existing.Edat = animal.Edat;
        existing.Mida = animal.Mida;
        existing.Estat = animal.Estat;
        existing.ImatgeUrl = animal.ImatgeUrl;

        var updated = await _AnimalService.UpdateAnimal(existing);

        return Ok(updated);
    }
}
