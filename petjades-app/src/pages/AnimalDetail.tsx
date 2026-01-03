import { Footer } from "../components/Footer";
import { NavBar } from "../components/Navbar";
import { AnimalPresentation } from "../sections/AnimalDetail/AnimalPresentation";

export const AnimalDetail = () => {
    return (
        <div>
            <NavBar />
            <AnimalPresentation />
            <Footer />
        </div>
    );
}