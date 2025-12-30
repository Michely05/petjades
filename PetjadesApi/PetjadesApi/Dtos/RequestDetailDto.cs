namespace PetjadesApi.Dtos
{
    public class RequestDetailDto
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Email { get; set; }
        public string Tipus { get; set; }
        public string Missatge { get; set; }
        public string? AnimalNom { get; set; }
        public string Resposta { get; set; }
    }
}

