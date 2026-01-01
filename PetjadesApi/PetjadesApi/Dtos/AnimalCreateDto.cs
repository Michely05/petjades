namespace PetjadesApi.Dtos
{
    public class AppointmentCreateDto
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Title { get; set; }
        public string PersonName { get; set; }
        public string PersonEmail { get; set; }
        public int? RequestId { get; set; }
        public int? AnimalId { get; set; }
    }
}

