import { BaseButton } from "./BaseButton";

interface FilterProps {
    filters: {
    estat: string;
    genere: string;
    edat: string;
    mida: string;
};
    onChange: (key: string, value: string) => void;
    onReset: () => void;
}

export const Filter = ({ filters, onChange, onReset }: FilterProps) => {
    return (
        <div className="border-2 bg-[#f1f7ec] p-6 max-w-[900px] rounded-md" style={{ borderColor: "var(--primary-color)" }}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Disponible per:</label>
                        <select
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6b945a]"
                            value={filters.estat}
                            onChange={(e) => onChange("estat", e.target.value)}
                            style={{ borderColor: "var(--primary-color)" }}>
                                <option value={""}>Qualsevol</option>
                                <option value={"adopcio"}>Adopció</option>
                                <option value={"acollida"}>Acollida</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Gènere:</label>
                        <select
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6b945a]"
                            value={filters.genere}
                            onChange={(e) => onChange("genere", e.target.value)}
                            style={{ borderColor: "var(--primary-color)" }}>
                                <option value={""}>Qualsevol</option>
                                <option value={"mascle"}>Mascle</option>
                                <option value={"femella"}>Femella</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Edat:</label>
                        <select
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6b945a]"
                            value={filters.edat}
                            onChange={(e) => onChange("edat", e.target.value)}
                            style={{ borderColor: "var(--primary-color)" }}>
                                <option value={""}>Qualsevol</option>
                                <option value={"cadell"}>Cadell</option>
                                <option value={"adult"}>Adult</option>
                                <option value={"senior"}>Sènior</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Mida:</label>
                        <select
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6b945a]"
                            value={filters.mida}
                            onChange={(e) => onChange("mida", e.target.value)}
                            style={{ borderColor: "var(--primary-color)" }}>
                                <option value={""}>Qualsevol</option>
                                <option value={"petit"}>Petita</option>
                                <option value={"mitja"}>Mitjana</option>
                                <option value={"gran"}>Gran</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                    <BaseButton className="w-full sm:w-auto" variant="primary" onClick={onReset}>
                        NETEJAR
                    </BaseButton>
                </div>
            </form>
        </div>
    );
};



