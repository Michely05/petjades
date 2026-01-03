import { useEffect, useState } from "react";
import { Filter } from "../../components/Filter";
import { Animal } from "../../types/Animal";
import axios from "axios";
import { AnimalGrid } from "../../components/AnimalGrid";
import { API_URL } from "../../config/api";

export const AdoptDogs = () => {

    const [allDogs, setAllDogs] = useState<Animal[]>([]);
    const [filteredDogs, setFilteredDogs] = useState<Animal[]>([]);

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
                const filtered = res.data.filter((a: Animal) => a.especie?.toLowerCase() === "gos");
                setAllDogs(filtered);
                setFilteredDogs(filtered);
            })
            .catch(() => console.error("Error carregant els animals"));
    }, []);

    const applyFilters = () => {
        let result = [...allDogs];

        if (filters.estat) result = result.filter(a => a.estat === filters.estat);
        if (filters.genere) result = result.filter(a => a.genere === filters.genere);
        if (filters.edat) result = result.filter(a => a.edat === filters.edat);
        if (filters.mida) result = result.filter(a => a.mida === filters.mida);

        setFilteredDogs(result);
    };

    useEffect(applyFilters, [filters]);

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-75 py-14">
            <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                GOSSOS PER ADOPTAR O ACOLLIR
            </h2>
            <Filter
                filters={filters}
                onChange={(key, value) => setFilters({ ...filters, [key]: value })}
                onReset={() => {
                    setFilters({ estat: "", genere: "", edat: "", mida: "" });
                    setFilteredDogs(allDogs);
                }} />

            <AnimalGrid animals={filteredDogs} />
        </div>
    );
}
