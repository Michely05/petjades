import { BaseButton } from "./BaseButton";

export const Filter = () => {
    return (
        <div className="border-2 bg-[#f1f7ec] p-6 max-w-[900px] rounded-md" style={{ borderColor: "var(--primary-color)" }}>
            <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Disponible per:</label>
                        <select
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6b945a]"
                            style={{ borderColor: "var(--primary-color)" }}>
                                <option>Qualsevol</option>
                                <option>Adopció</option>
                                <option>Acollida</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Gènere:</label>
                        <select
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6b945a]"
                            style={{ borderColor: "var(--primary-color)" }}>
                                <option>Qualsevol</option>
                                <option>Mascle</option>
                                <option>Femella</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Edat:</label>
                        <select
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6b945a]"
                            style={{ borderColor: "var(--primary-color)" }}>
                                <option>Qualsevol</option>
                                <option>Cadell</option>
                                <option>Adult</option>
                                <option>Sènior</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-semibold mb-1">Mida:</label>
                        <select
                            className="border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-[#6b945a]"
                            style={{ borderColor: "var(--primary-color)" }}>
                                <option>Qualsevol</option>
                                <option>Petita</option>
                                <option>Mitjana</option>
                                <option>Gran</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                    <BaseButton className="w-full sm:w-auto" variant="primary">
                        BUSCAR
                    </BaseButton>
                    <BaseButton className="w-full sm:w-auto" variant="secondary">
                        NETEJAR
                    </BaseButton>
                </div>
            </form>
        </div>
    );
};



