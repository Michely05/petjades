using PetjadesApi.Models;

namespace PetjadesApi.Dtos
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? AnimalName { get; set; }
    }
}

