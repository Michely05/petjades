using PetjadesApi.Dtos;
using PetjadesApi.Models;

namespace PetjadesApi.Services;

public interface IAppointmentService
{
    Task<List<AppointmentDto>> GetAllAsync();
    Task<Appointment?> GetByIdAsync(int id);
    Task<Appointment> CreateAsync(AppointmentCreateDto dto);
    Task<bool> UpdateAsync(int id, AppointmentUpdateDto dto);
    Task<bool> UpdateStatusAsync(int id, string status);
    Task<bool> DeleteAsync(int id);
}
