namespace PetjadesApi.Dtos
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Status { get; set; } = null!;
        public string PersonName { get; set; } = null!;
        public string PersonEmail { get; set; } = null!;
        public string? AnimalName { get; set; }
    }
}

