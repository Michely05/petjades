using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Services;

namespace PetjadesApi.Controllers;

[ApiController]
[Route("appointments")]
[Authorize]
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
}