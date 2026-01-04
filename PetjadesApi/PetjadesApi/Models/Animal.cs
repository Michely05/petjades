namespace PetjadesApi.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Nom { get; set; } = null!;
        public string Especie { get; set; } = null!;
        public string Genere { get; set; } = null!;
        public string Edat { get; set; } = null!;
        public string Mida { get; set; } = null!;
        public string Estat { get; set; } = null!;
        public string Descripcio { get; set; } = null!;
        public string? ImatgeUrl { get; set; }
    }
}
