namespace PetjadesApi.Dtos
{
    public class AppointmentUpdateDto
    {
        public string Title { get; set; } = "";
        public string PersonEmail { get; set; } = "";
        public string PersonName { get; set; } = "";
        public string? Notes { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? AnimalId { get; set; }
    }
}

