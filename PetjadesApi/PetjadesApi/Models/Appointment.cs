using System.ComponentModel.DataAnnotations;

namespace PetjadesApi.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public DateTime Start { get; set; }

        [Required]
        public DateTime End { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string PersonName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string PersonEmail { get; set; } = null!;

        public int? RequestId { get; set; }
        public Request? Request { get; set; }

        public int? AnimalId { get; set; }
        public Animal? Animal { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "pending";
    }
}
