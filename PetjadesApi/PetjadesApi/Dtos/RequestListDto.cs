namespace PetjadesApi.Dtos
{
    public class RequestListDto
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Email { get; set; }
        public string Tipus { get; set; }
        public string? AnimalNom { get; set; }
        public bool RespostaEnviada { get; set; }
    }
}

