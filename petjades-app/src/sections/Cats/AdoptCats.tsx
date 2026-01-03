import { useEffect, useState } from "react";
import { Filter } from "../../components/Filter";
import { Animal } from "../../types/Animal";
import axios from "axios";
import { AnimalGrid } from "../../components/AnimalGrid";
import { API_URL } from "../../config/api";

export const AdoptCats = () => {
    const [allCats, setAllCats] = useState<Animal[]>([]);
    const [filteredCats, setFilteredCats] = useState<Animal[]>([]);

    const [filters, setFilters] = useState({
        estat: "",
        genere: "",
        edat: "",
        mida: ""
    });

    useEffect(() => {
    axios
      .get(`${API_URL}/animals`)
      .then((res) => {
        const filtered = res.data.filter((a: Animal) => a.especie === "gat");
        setAllCats(filtered);
        setFilteredCats(filtered);
      })
      .catch((err) => console.error("Error carregant gats:", err));
      
    }, []);

    const applyFilters = () => {
        let result = [...allCats];

        if (filters.estat) result = result.filter(a => a.estat === filters.estat);
        if (filters.genere) result = result.filter(a => a.genere === filters.genere);
        if (filters.edat) result = result.filter(a => a.edat === filters.edat);
        if (filters.mida) result = result.filter(a => a.mida === filters.mida);

        setFilteredCats(result);
    };

    useEffect(applyFilters, [filters]);

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-75 py-14">
            <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                GATS PER ADOPTAR O ACOLLIR
            </h2>
            <Filter
                filters={filters}
                onChange={(key, value) => setFilters({ ...filters, [key]: value })}
                onReset={() => {
                    setFilters({ estat: "", genere: "", edat: "", mida: "" });
                    setFilteredCats(allCats);
                }} />
            
            <AnimalGrid animals={filteredCats} />

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
