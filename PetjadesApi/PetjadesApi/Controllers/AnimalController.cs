using Microsoft.AspNetCore.Mvc;
using PetjadesApi.Dtos;
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
    public async Task<IActionResult> Create([FromForm] AnimalCreateDto dto)
    {
        var animal = new Animal
        {
            Nom = dto.Nom,
            Especie = dto.Especie,
            Genere = dto.Genere,
            Edat = dto.Edat,
            Mida = dto.Mida,
            Estat = dto.Estat
        };

        if (dto.Image != null)
        {
            var folder = Path.Combine("wwwroot", "images", "animals");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
            var filePath = Path.Combine(folder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await dto.Image.CopyToAsync(stream);

            animal.ImatgeUrl = $"/images/animals/{fileName}";
        }

        var created = await _AnimalService.CreateAsync(animal);
        return Created($"/animals/{created.Id}", created);
    }

    [HttpPut("{id}")]
    
    public async Task<IActionResult> UpdateAnimal(
        int id,
        [FromForm] AnimalUpdateDto dto)
    {
        var existing = await _AnimalService.GetByIdAsync(id);

        if (existing == null)
            return NotFound("Animal no trobat");

        // Actualizar campos
        existing.Nom = dto.Nom;
        existing.Especie = dto.Especie;
        existing.Genere = dto.Genere;
        existing.Edat = dto.Edat;
        existing.Mida = dto.Mida;
        existing.Estat = dto.Estat;

        // Si envían imagen nueva → sustituir
        if (dto.Image != null)
        {
            var folder = Path.Combine("wwwroot", "images", "animals");
            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            var fileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
            var filePath = Path.Combine(folder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await dto.Image.CopyToAsync(stream);

            existing.ImatgeUrl = $"/images/animals/{fileName}";
        }

        var updated = await _AnimalService.UpdateAnimal(existing);
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _AnimalService.DeleteAsync(id);

        if (!deleted)
            return NotFound("Animal no trobat");

        return NoContent();
    }
}
