using System.ComponentModel.DataAnnotations;

namespace PetjadesApi.Models
{
    public class Request
    {
        public int Id { get; set; }
        [Required]
        public string Nom { get; set; }
        [Required]
        public string Cognom { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        [StringLength(250)]
        public string Missatge { get; set; }
        [Required]
        public string Tipus { get; set; }
        public int? AnimalId { get; set; }
        public Animal? Animal { get; set; }
        public string? Resposta { get; set; }
        public bool RespostaEnviada { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
