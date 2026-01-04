using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace PetjadesApi.Services;

public class ResendEmailService : IEmailService
{
    private readonly HttpClient _http;
    private readonly IConfiguration _config;

    public ResendEmailService(HttpClient http, IConfiguration config)
    {
        _http = http;
        _config = config;
    }

    public async Task SendAsync(string to, string subject, string body)
    {
        var apiKey = _config["RESEND_API_KEY"];
        var from = _config["EMAIL_FROM"];

        if (string.IsNullOrWhiteSpace(apiKey))
            throw new InvalidOperationException("RESEND_API_KEY is not configured");

        if (string.IsNullOrWhiteSpace(from))
            throw new InvalidOperationException("EMAIL_FROM is not configured");

        var payload = new
        {
            from = from,
            to = new[] { to },
            subject = subject,
            html = body
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        request.Content = new StringContent(
            JsonSerializer.Serialize(payload),
            Encoding.UTF8,
            "application/json"
        );

        var response = await _http.SendAsync(request);

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Resend error: {error}");
        }
    }
}
