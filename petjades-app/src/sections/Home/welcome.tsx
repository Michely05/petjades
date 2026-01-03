import welcomeImage from "../../assets/img/landing-image-1.jpg"; 
import { BaseButton } from "../../components/BaseButton";
import { useNavigate } from "react-router-dom";
import "animate.css";

export const Welcome = () => {

  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen md:h-[90vh] overflow-hidden px-4 md:px-12 lg:px-24">
      {/* background image */}
      <img
        src={welcomeImage}
        alt="Welcome"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* dark layer */}
      <div className="absolute inset-0 bg-black/50" />

      {/* text content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <div className="animate__animated animate__fadeInDown max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 font-title">
            Som Petjades
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
            Un espai dedicat a donar una nova oportunitat a gossos i gats que busquen una llar plena d'amor. 
            Coneix els nostres peluts i ajuda'ls a trobar la família que mereixen. 
            Si estàs preparat/da per canviar una vida -i deixar petjada en ells-, fes el primer pas i descobreix qui t'està esperant.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <BaseButton variant="primary" onClick={() => navigate("/adopta-gats")}>BUSCAR GATS</BaseButton>
            <BaseButton variant="primary" onClick={() => navigate("/adopta-gossos")}>BUSCAR GOSSOS</BaseButton>
          </div>
        </div>
      </div>
    </section>
  );
};
