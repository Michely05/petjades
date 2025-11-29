import aboutUsImage from '../../assets/img/about-us-images.png';
import heartIcon from '../../assets/icons/heart.png';
import handshakeIcon from '../../assets/icons/handshake.png';
import windowIcon from '../../assets/icons/window.png';
import teamIcon from '../../assets/icons/team.png';
import adoptaGos from '../../assets/img/adopta-gos.png';
import { PawIcon } from '../../components/PawIcon';

export const AboutUs = () => {
    return (
        <section className="px-4 sm:px-8 md:px-16 lg:px-75 pt-14">
            <h2 className="font-title font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color)">
                SOBRE NOSALTRES
            </h2>

            <div className="mb-6 space-y-3 text-lg sm:text-xl md:text-2xl">
                <p>
                    Som Petjades, una protectora d'animals sense ànim de lucre dedicada al rescat, 
                    recuperació i cerca d'una llar per a gossos i gats abandonats o en situació de vulnerabilitat.
                </p>
                <p>
                    Treballem cada dia per oferir-los una segona oportunitat, proporcionant-los atenció 
                    veterinària, afecte, un entorn segur i tota la paciència que necessiten fins que troben
                    una família responsable que els obri les portes de casa seva.
                </p>
                <p>
                    A Petjades creiem que cada vida importa. El nostre compromís és garantir el benestar 
                    de cada animal des del moment en què arriba fins que comença la seva nova vida.
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:justify-start gap-6">
                <div className="flex-1 text-side">
                    {/* mission */}
                    <div className="mb-6">
                        <h3 className="font-title font-bold text-1xl sm:text-2xl md:text-3xl lg:text-[2rem] mb-4 text-(--primary-color)">LA NOSTRA MISSIÓ</h3>
                        <ul className="space-y-3 text-lg sm:text-xl md:text-2xl">
                            <li className="flex gap-3"><PawIcon /><span>Rescatar i acollir animals abandonats, perduts o maltractats.</span></li>
                            <li className="flex gap-3"><PawIcon /><span>Proporcionar atenció veterinària, alimentació i cures diàries.</span></li>
                            <li className="flex gap-3"><PawIcon /><span>Socialitzar i acompanyar cada animal durant el procés de recuperació.</span></li>
                            <li className="flex gap-3"><PawIcon /><span>Promoure l'adopció responsable i la convivència respectuosa.</span></li>
                            <li className="flex gap-3"><PawIcon /><span>Fomentar l'esterilització i la tinença responsable.</span></li>
                        </ul>
                    </div>

                    {/* what We Do */}
                    <div className="mb-6">
                        <h3 className="font-title font-bold text-1xl sm:text-2xl md:text-3xl lg:text-[2rem] mb-4 text-(--primary-color)">QUÈ FEM</h3>
                        <ul className="space-y-3 text-lg sm:text-xl md:text-2xl">
                            <li className="flex gap-3"><PawIcon /><span>Atenció i acollida temporal.</span></li>
                            <li className="flex gap-3"><PawIcon /><span>Programes d'adopció responsable.</span></li>
                            <li className="flex gap-3"><PawIcon /><span>Cases d'acollida per a animals en recuperació.</span></li>
                            <li className="flex gap-3"><PawIcon /><span>Campanyes d'esterilització i sensibilització.</span></li>
                            <li className="flex gap-3"><PawIcon /><span>Atenció veterinària i rehabilitació.</span></li>
                        </ul>
                    </div>
                </div>

                <div className="image-side hidden md:block flex-1">
                    <img src={aboutUsImage} alt="Sobre nosaltres" className="w-full max-w-[800px]" />
                </div>
            </div>

            {/* values */}
            <div>
                <h3 className="font-title font-bold text-1xl sm:text-2xl md:text-3xl lg:text-[2rem] mb-4 text-(--primary-color)">ELS NOSTRES VALORS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e2ebdd] flex flex-col items-center">
                        <img src={heartIcon} alt="Amor pels animals" className="w-14 h-14 mb-2" />
                        <p>Amor i respecte pels animals.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e2ebdd] flex flex-col items-center">
                        <img src={handshakeIcon} alt="Compromís" className="w-14 h-14 mb-2" />
                        <p>Compromís i dedicació en cada cas.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e2ebdd] flex flex-col items-center">
                        <img src={windowIcon} alt="Transparència" className="w-14 h-14 mb-2" />
                        <p>Transparència en la nostra labor.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e2ebdd] flex flex-col items-center">
                        <img src={teamIcon} alt="Treball en equip" className="w-14 h-14 mb-2" />
                        <p>Treball en equip amb els voluntaris.</p>
                    </div>
                </div>
            </div>

            {/* why adopt */}
            <div>
                <h3 className="font-title font-bold text-1xl sm:text-2xl md:text-3xl lg:text-[2rem] mb-4 text-(--primary-color)">FINALMENT, PER QUÈ ADOPTAR?</h3>
                <div className="flex flex-col md:flex-row justify-around gap-6">
                    <div className="text-side flex-1">
                        <p className="text-2xl mb-6">Perquè adoptar és <strong>salvar vides</strong>.</p>
                        <p className="text-lg sm:text-xl md:text-2xl mb-6">
                            Cada adopció no només canvia el destí d'un animal, sinó que també obre espai 
                            per rescatar-ne un altre que pot estar esperant l'oportunitat de ser salvat. 
                            Molts arriben amb pors, ferides o experiències complicades, però amb amor, paciència 
                            i una llar estable, es transformen en animals confiats, afectuosos i increïbles companys de vida.
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl mb-6">
                            L'adopció és un acte de responsabilitat i empatia, i és gràcies a persones com tu que podem seguir
                            oferint-los una segona oportunitat i un futur millor.
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl flex gap-2"><strong>A Petjades, cada petjada compta</strong><PawIcon /></p>
                    </div>

                    <div className="image-side hidden md:block">
                        <img className="w-60" src={adoptaGos} alt="Adopta!" />
                    </div>
                </div>
            </div>
        </section>
    );
};
