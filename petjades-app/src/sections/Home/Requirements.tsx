import requirementIlustration from "../../assets/img/requirement-ilustration.png";

export const Requirements = () => {
  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-75 py-4">
      <h2 className="font-title font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-5 text-(--primary-color) text-center">
        REQUISITS PER ADOPTAR O ACOLLIR
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        
        {/* TEXT SIDE */}
        <div className="flex-1 p-4">
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
            La persona sol·licitant ha de complir amb els següents aspectes abans
            d'adoptar o acollir un dels nostres animals:
          </p>

          <ul className="list-disc list-inside text-lg sm:text-xl md:text-2xl space-y-4 pt-5">
            <li>Ser major d'edat a l'hora d'iniciar el procés.</li>
            <li>Aportar document d'identitat.</li>
            <li>
              En el cas d'adopció, abonar les taxes que inclouen desparasitació,
              esterilització, microxip i vacunes.
            </li>
            <li>Disposar d'un habitatge adequat i segur per a l'animal.</li>
            <li>Mostrar compromís, responsabilitat i afecte envers l'animal.</li>
          </ul>
        </div>

        {/* IMAGE SIDE */}
        <div className="flex-1 p-4 flex justify-center items-center">
          <img
            src={requirementIlustration}
            className="w-48 sm:w-64 md:w-80 lg:w-md object-contain"
            alt="Requisits per adoptar"
          />
        </div>

      </div>
    </section>
  );
};
