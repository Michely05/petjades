import { Footer } from "../components/Footer";
import { NavBar } from "../components/navbar";
import { AdoptDogs } from "../sections/Dogs/AdoptDogs";

export const Dogs = () => {
    return (
        <div>
            <NavBar />
            <AdoptDogs />
            <Footer />
        </div>
    );
}