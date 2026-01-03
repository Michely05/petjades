using Microsoft.EntityFrameworkCore;
using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Repositories;

namespace PetjadesApi.Services;

public class AppointmentService : IAppointmentService
{
    private readonly IAppointmentRepository _repo;

    public AppointmentService(IAppointmentRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<AppointmentDto>> GetAllAsync()
    {
        var appointments = await _repo.GetAllAsync();

        return appointments.Select(a => new AppointmentDto
        {
            Id = a.Id,
            Title = a.Title,
            StartDate = a.StartDate,
            EndDate = a.EndDate,
            AnimalName = a.Animal != null ? a.Animal.Nom : null
        }).ToList();
    }

    public async Task<Appointment?> GetByIdAsync(int id)
    {
        return await _repo.GetByIdAsync(id);
    }

    public async Task<Appointment> CreateAsync(AppointmentCreateDto dto)
    {
        var appointment = new Appointment
        {
            Title = dto.Title,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            AnimalId = dto.AnimalId
        };

        await _repo.AddAsync(appointment);
        return appointment;
    }

    public async Task<bool> UpdateAsync(int id, AppointmentUpdateDto dto)
    {
        var appointment = await _repo.GetByIdAsync(id);
        if (appointment == null) return false;

        appointment.Title = dto.Title;
        appointment.StartDate = dto.StartDate;
        appointment.EndDate = dto.EndDate;
        appointment.AnimalId = dto.AnimalId;

        await _repo.UpdateAsync(appointment);
        return true;
    }


    public async Task<bool> UpdateStatusAsync(int id, string status)
    {
        var appointment = await _repo.GetByIdAsync(id);
        if (appointment == null) return false;

        await _repo.UpdateAsync(appointment);

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var appointment = await _repo.GetByIdAsync(id);
        if (appointment == null) return false;

        await _repo.DeleteAsync(appointment);
        return true;
    }
}
