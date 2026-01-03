export interface Request {
  id: number;
  nom: string;
  email: string;
  missatge: string;
  tipus: string;
  animalId?: number;
  animalNom?: string;
  resposta?: string;
  dataCreacio: string;
  contestada: boolean;
}
