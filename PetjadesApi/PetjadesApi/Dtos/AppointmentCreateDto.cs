namespace PetjadesApi.Dtos
{
    public class AppointmentCreateDto
    {
        public string Title { get; set; }
        public string PersonName { get; set; } = null!;
        public string PersonEmail { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? AnimalId { get; set; }
    }
}

