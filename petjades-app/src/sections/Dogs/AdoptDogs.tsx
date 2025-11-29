import { Filter } from "../../components/Filter";

export const AdoptDogs = () => {
    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-75 py-14">
            <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                GOSSOS PER ADOPTAR O ACOLLIR
            </h2>
            <Filter />
        </div>
    );
}
