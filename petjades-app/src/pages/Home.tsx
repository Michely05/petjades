import { NavBar } from "../components/Navbar";
import { Welcome } from "../sections/Home/welcome";
import { MeetThePets } from "../sections/Home/MeetThePets";
import { Requirements } from "../sections/Home/Requirements";
import { Contact } from "../sections/Home/Contact";
import { Footer } from "../components/Footer";

export const Home = () => {
    return (
        <div>
            <NavBar />
            <Welcome />
            <MeetThePets />
            <Requirements />
            <Contact />
            <Footer />
        </div>
    );
};
