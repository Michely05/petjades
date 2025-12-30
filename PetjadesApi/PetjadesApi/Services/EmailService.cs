using PetjadesApi.Dtos;
using PetjadesApi.Models;
using PetjadesApi.Repositories;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography.Xml;

namespace PetjadesApi.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }
    public async Task SendAsync(string to, string subject, string body)
    {

        var message = new MailMessage
        {
            From = new MailAddress(_config["Email:From"]),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };

        message.To.Add(to);

        using var smtp = new SmtpClient(
            _config["Email:Smtp"],
            int.Parse(_config["Email:Port"])
        )
        {
            Credentials = new NetworkCredential(
                _config["Email:User"],
                _config["Email:Password"]
            ),
            EnableSsl = true
        };

        await smtp.SendMailAsync(message);

    }

}
