import { NavBar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ColaborateUs } from "../sections/Collaborate/ColaborateUs";
import { ColaborateContact } from "../sections/Collaborate/ColaborateContact";

export const Colaborate = () => {
    return (
        <div>
            <NavBar />
            <ColaborateUs />
            <ColaborateContact />
            <Footer />
        </div>
    );
};