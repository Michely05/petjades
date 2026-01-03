import { useNavigate } from "react-router-dom";
import { Animal } from "../types/Animal";
import { API_URL } from "../config/api";

interface AnimalGridProps {
    animals: Animal[];
}

export const AnimalGrid = ({ animals }: AnimalGridProps) => {

    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
            {animals.map((animal) => (
                <div
                    onClick={() => navigate(`/animal/${animal.id}`)}
                    key={animal.id}
                    className="relative overflow-hidden shadow-md bg-white cursor-pointer hover:scale-[1.05] transition"
                >
                    <img
                        src={`https://${API_URL}${animal.imatgeUrl}`}
                        alt={animal.nom}
                        className="w-full h-70 object-cover"
                    />

                    <div className="absolute bottom-0 w-full bg-black/45 text-white text-center py-2 text-lg font-semibold">
                        {animal.nom}
                    </div>
                </div>
            ))}
        </div>
    );
};
