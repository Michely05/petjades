namespace PetjadesApi.Dtos
{
    public class AnimalCreateDto
    {
        public string Nom { get; set; }
        public string Especie { get; set; }
        public string Genere { get; set; }
        public string Edat { get; set; }
        public string Mida { get; set; }
        public string Estat { get; set; }
        public IFormFile? Image { get; set; }
    }
}

