using Microsoft.AspNetCore.Mvc;
using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Services;

namespace PetjadesApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AnimalsController : ControllerBase
{
    private readonly IAnimalService _animalService;
    private readonly CloudinaryService _cloudinaryService;

    public AnimalsController(IAnimalService animalService, CloudinaryService cloudinaryService)
    {
        _animalService = animalService;
        _cloudinaryService = cloudinaryService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var animal = await _animalService.GetByIdAsync(id);

        if (animal == null)
            return NotFound("Animal no trobat");

        return Ok(animal);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var animals = await _animalService.GetAllAsync();
        return Ok(animals);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] AnimalCreateDto dto)
    {
        var animal = new Animal
        {
            Nom = dto.Nom,
            Especie = dto.Especie,
            Genere = dto.Genere,
            Edat = dto.Edat,
            Mida = dto.Mida,
            Estat = dto.Estat,
            Descripcio = dto.Descripcio
        };

        if (dto.Image != null)
        {
            var imageUrl = await _cloudinaryService.UploadImageAsync(dto.Image);
            animal.ImatgeUrl = imageUrl;
        }

        var created = await _animalService.CreateAsync(animal);
        return Created($"/animals/{created.Id}", created);
    }

    [HttpPut("{id}")]
    
    public async Task<IActionResult> UpdateAnimal(
        int id,
        [FromForm] AnimalUpdateDto dto)
    {
        var existing = await _animalService.GetByIdAsync(id);

        if (existing == null)
            return NotFound("Animal no trobat");

        existing.Nom = dto.Nom;
        existing.Especie = dto.Especie;
        existing.Genere = dto.Genere;
        existing.Edat = dto.Edat;
        existing.Mida = dto.Mida;
        existing.Estat = dto.Estat;
        existing.Descripcio = dto.Descripcio;

        // imatge nova > sustituir anterior
        if (dto.Image != null)
        {
            var imageUrl = await _cloudinaryService.UploadImageAsync(dto.Image);
            existing.ImatgeUrl = imageUrl;
        }

        var updated = await _animalService.UpdateAnimal(existing);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _animalService.DeleteAsync(id);

        if (!deleted)
            return NotFound("Animal no trobat");

        return NoContent();
    }
}
