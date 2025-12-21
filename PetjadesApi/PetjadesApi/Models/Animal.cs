namespace PetjadesApi.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Especie { get; set; }
        public string Genere { get; set; }
        public string Edat { get; set; }
        public string Mida { get; set; }
        public string Estat { get; set; } 
        public string Descripcio { get; set; }
        public string? ImatgeUrl { get; set; }
    }
}
