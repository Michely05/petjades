namespace PetjadesApi.Dtos
{
    public class AppointmentDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = "pending";
        public string? PersonName { get; set; }
        public string? PersonEmail { get; set; }
        public string? AnimalName { get; set; }
    }
}

