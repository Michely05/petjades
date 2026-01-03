using PetjadesApi.Dtos;
using PetjadesApi.Models;

namespace PetjadesApi.Services;

public interface IEmailService
{
    Task SendAsync(string to, string subject, string body);
}
