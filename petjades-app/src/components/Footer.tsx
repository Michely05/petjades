import instagramIcon from '../assets/icons/instagram.png';
import facebookIcon from '../assets/icons/facebook.png';
import tiktokIcon from '../assets/icons/tiktok.png';

export const Footer = () => {
    return (
        <footer className="bg-(--primary-color) text-white mt-10 px-6 py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-20 items-center md:items-start text-center md:text-left">

                {/* footer text */}
                <div className="flex-1">
                    <p className="text-lg leading-loose">
                        A la nostre protectora treballem cada dia perquè cap gos i gat no visqui sense llar. <br />
                        Som una associació sense ànim de lucre compromesa amb el respecte i la protecció dels animals.
                    </p>
                </div>

                {/* RRSS */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-lg mb-3">També pots trobar-nos a:</p>

                    <ul className="flex gap-6 justify-center md:justify-start">
                        <li>
                            <a href="https://www.facebook.com/petjades" target="_blank" rel="noopener noreferrer">
                                <img src={facebookIcon} alt="Facebook" className="w-8 h-8 hover:opacity-80 transition" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/petjades" target="_blank" rel="noopener noreferrer">
                                <img src={instagramIcon} alt="Instagram" className="w-8 h-8 hover:opacity-80 transition" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tiktok.com/petjades" target="_blank" rel="noopener noreferrer">
                                <img src={tiktokIcon} alt="TikTok" className="w-8 h-8 hover:opacity-80 transition" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
