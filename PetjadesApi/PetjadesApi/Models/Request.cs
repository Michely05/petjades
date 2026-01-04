using System.ComponentModel.DataAnnotations;

namespace PetjadesApi.Models
{
    public class Request
    {
        public int Id { get; set; } 
        [Required]
        public string Nom { get; set; } = null!;
        [Required]
        public string Cognom { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        [Required]
        [StringLength(250)]
        public string Missatge { get; set; } = null!;
        [Required] 
        public string Tipus { get; set; } = null!;
        public int? AnimalId { get; set; } = null!;
        public Animal? Animal { get; set; } = null!;
        public string? Resposta { get; set; } = null!;
        public bool RespostaEnviada { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
