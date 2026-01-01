using PetjadesApi.Dtos;
using PetjadesApi.Models;

namespace PetjadesApi.Services;

public interface IAppointmentService
{
    Task<List<AppointmentDto>> GetAllAsync();
}
