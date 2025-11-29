export const ColaborateUs = () => {
    return (
        <section className="px-4 sm:px-8 md:px-16 lg:px-75 pt-14">
            <h2 className="font-title font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color)">COL·LABORA AMB NOSALTRES!</h2>
            <div className="space-y-3">
                <p className="text-lg sm:text-xl md:text-2xl">A Petjades treballem dia a dia per oferir una segona 
                    oportunitat a tots els animals que han estat abandonats o es troben en una
                     situació vulnerable.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl">
                    La teva ajuda fa possible rebre alimentació, atenció veterinaria, refugi, 
                    però sobre tot una vida digna i plena d'amor.
                </p>
                <p className="text-lg sm:text-xl md:text-2xl">Hi ha diverses maneres de col·laborar:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">

                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e2ebdd]">
                    <h3 className="text-(--primary-color) font-bold">FES-TE CASA D'ACOLLIDA</h3>
                    <p>
                        Pots obrir casa teva temporalment a un animalet que ho necessiti.
                        Tu poses l'afecte i l'espai, nosaltres et facilitem llit, menjar i joguines.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e2ebdd]">
                    <h3 className="text-(--primary-color) font-bold">FES UN DONATIU</h3>
                    <p>
                        Qualsevol import compta. Pots col·laborar amb un donatiu econòmic o
                        també amb material com pinso, mantes, llits, sorra o joguines.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e2ebdd]">
                    <h3 className="text-(--primary-color) font-bold">FES-TE VOLUNTARI</h3>
                    <p>
                        Si tens temps i ganes d'ajudar, pots unir-te al nostre equip.
                        Necessitem mans per socialitzar amb els animals, assistir en rescats i
                        tenir cura del refugi.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e2ebdd]">
                    <h3 className="text-(--primary-color) font-bold">DIFON</h3>
                    <p>
                        Pots compartir la nostra pàgina web a amics i familiars que estiguin
                        pensant en donar la benvinguda a un animal. Així fomentes l'adopció i
                        acollida dels nostres peluts.
                    </p>
                </div>
                
            </div>
        </section>
    );
}