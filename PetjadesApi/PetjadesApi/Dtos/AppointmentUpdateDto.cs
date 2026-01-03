namespace PetjadesApi.Dtos
{
    public class AppointmentUpdateDto
    {
        public string Title { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? AnimalId { get; set; }
    }
}

