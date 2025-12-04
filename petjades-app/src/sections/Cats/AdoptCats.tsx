import { useEffect, useState } from "react";
import { Filter } from "../../components/Filter";
import { Animal } from "../../types/Animal";
import axios from "axios";

export const AdoptCats = () => {
    const [cats, setCats] = useState<Animal[]>([]);

    useEffect(() => {
    axios
      .get("https://localhost:7151/animals")
      .then((res) => {
        const filtered = res.data.filter((a: Animal) => a.especie === "gat");
        setCats(filtered);
      })
      .catch((err) => console.error("Error carregant gats:", err));
  }, []);

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-75 py-14">
            <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                GATS PER ADOPTAR O ACOLLIR
            </h2>
            <Filter />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                {cats.map((cat) => (
                <div
                    key={cat.id}
                    className="relative overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                >
                    {/* Imatge gats */}
                    <img
                    src={`https://localhost:7151${cat.imatgeUrl}`}
                    alt={cat.nom}
                    className="w-full h-64 object-cover"
                    />

                    {/* Nom gats */}
                    <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white p-3 text-center font-semibold text-lg">
                    {cat.nom}
                    </div>
                </div>
                ))}
            </div>

            {/* <div className="flex justify-center mt-10">
                <div className="flex items-center gap-2 text-sm">
                <button className="px-3 py-1 border rounded hover:bg-gray-200">
                    &lt; Anterior
                </button>

                <button className="px-3 py-1 border rounded bg-gray-200">1</button>
                <button className="px-3 py-1 border rounded">2</button>
                <button className="px-3 py-1 border rounded">3</button>

                <button className="px-3 py-1 border rounded hover:bg-gray-200">
                    Següent &gt;
                </button>
                </div>
            </div> */}
        </div>
    );
}
