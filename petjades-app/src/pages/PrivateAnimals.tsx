import { BaseButton } from "../components/BaseButton"
import { AnimalTable } from "../sections/PrivateAnimals/AnimalTable"
import { useNavigate } from "react-router-dom";

export const PrivateAnimals = () => {
    const navigate = useNavigate();

    return (
        <div className="">
            <h1 className="text-3xl text-(--primary-color) font-bold mb-8">ANIMALS</h1>

            <div className="flex justify-end">
                <BaseButton variant="primary" className="flex justify-end" onClick={() => navigate("/dashboard/new-animal")}>
                    AFEGIR NOU
                </BaseButton>
            </div>

            <AnimalTable />
        </div>
    )
}