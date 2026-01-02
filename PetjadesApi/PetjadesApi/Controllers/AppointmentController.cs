using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Services;

namespace PetjadesApi.Controllers;

[ApiController]
[Route("appointments")]
//[Authorize]
public class AppointmentController : ControllerBase
{
    private readonly IAppointmentService _AppointmentService;

    public AppointmentController(IAppointmentService service)
    {
        _AppointmentService = service;
    }

    [HttpGet] 
    public async Task<IActionResult> GetAll()
    {
        var appointments = await _AppointmentService.GetAllAsync();
        return Ok(appointments);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var appointment = await _AppointmentService.GetByIdAsync(id);

        if (appointment == null)
            return NotFound();

        return Ok(appointment);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AppointmentCreateDto dto)
    {
        if (dto.StartDate >= dto.EndDate)
            return BadRequest("La data d'inici ha de ser anterior a la de fi.");

        var appointment = await _AppointmentService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = appointment.Id },
            appointment
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] AppointmentUpdateDto dto)
    {
        if (dto.StartDate >= dto.EndDate)
            return BadRequest("La data d'inici ha de ser anterior a la de fi.");

        var updated = await _AppointmentService.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] AppointmentUpdateStatusDto dto)
    {
        var allowedStatuses = new[] { "pending", "confirmed", "cancelled" };

        if (!allowedStatuses.Contains(dto.Status))
            return BadRequest("Estat no vàlid.");

        var updated = await _AppointmentService.UpdateStatusAsync(id, dto.Status);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _AppointmentService.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}