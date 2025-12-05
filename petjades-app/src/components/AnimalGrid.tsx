import { Animal } from "../types/Animal";

interface AnimalGridProps {
    animals: Animal[];
}

export const AnimalGrid = ({ animals }: AnimalGridProps) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-10">
            {animals.map((animal) => (
                <div
                    key={animal.id}
                    className="relative overflow-hidden shadow-md bg-white"
                >
                    <img
                        src={`https://localhost:7151${animal.imatgeUrl}`}
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
