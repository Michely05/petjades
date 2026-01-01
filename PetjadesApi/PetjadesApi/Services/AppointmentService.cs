using Microsoft.EntityFrameworkCore;
using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Repositories;

namespace PetjadesApi.Services;

public class AppointmentService : IAppointmentService
{
    private readonly ApplicationDbContext _context;

    public AppointmentService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<AppointmentDto>> GetAllAsync()
    {
        return await _context.Appointments
            .Include(a => a.Animal)
            .Select(a => new AppointmentDto
            {
                Id = a.Id,
                Title = a.Title,
                Start = a.Start,
                End = a.End,
                Status = a.Status,
                PersonName = a.PersonName,
                PersonEmail = a.PersonEmail,
                AnimalName = a.Animal != null ? a.Animal.Nom : null
            })
            .ToListAsync();
    }
}
