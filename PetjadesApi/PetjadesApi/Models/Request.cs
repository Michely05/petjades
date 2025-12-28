using System.ComponentModel.DataAnnotations;

namespace PetjadesApi.Models
{
    public class Request
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Cognom { get; set; }
        public string Email { get; set; }
        [StringLength(250)]
        public string Missatge { get; set; }
        public string Tipus { get; set; }
        public int? AnimalId { get; set; }
        public Animal? Animal { get; set; }
        public string? Resposta { get; set; }
        public bool RespostaEnviada { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
