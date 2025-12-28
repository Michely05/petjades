using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Repositories;

namespace PetjadesApi.Services;

public class EmailService : IEmailService
{
    public Task SendAsync(string to, string subject, string body)
    {
        Console.WriteLine($"EMAIL TO: {to}");
        Console.WriteLine(subject);
        Console.WriteLine(body);

        return Task.CompletedTask;
    }

}
