using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace PetjadesApi.Services;

public class EmailService : IEmailService
{
    private readonly HttpClient _http;

    public EmailService(IConfiguration config)
    {
        var apiKey = config["RESEND_API_KEY"];

        if (string.IsNullOrWhiteSpace(apiKey))
            throw new InvalidOperationException("RESEND_API_KEY is not configured");

        _http = new HttpClient
        {
            BaseAddress = new Uri("https://api.resend.com/")
        };

        _http.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);
    }

    public async Task SendAsync(string to, string subject, string body)
    {
        var payload = new
        {
            from = "Petjades <onboarding@resend.dev>",
            to = new[] { to },
            subject = subject,
            html = body
        };

        var response = await _http.PostAsJsonAsync("emails", payload);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Resend error: {error}");
        }
    }
}
