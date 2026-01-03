using System.ComponentModel.DataAnnotations;

namespace PetjadesApi.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public int? AnimalId { get; set; }
        public Animal? Animal { get; set; }
    }
}
