import ContactIlustration from "../../assets/img/contact-ilustration.png";
import { Stack, TextField } from "@mui/material";
import { BaseButton } from "../../components/BaseButton";

export const Contact = () => {
  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-75 py-4">
      <h2 className="font-title font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-5 text-(--primary-color) text-center">CONTACTA'NS!</h2>

      <p className="text-center text-xl sm:text-2xl mb-10 px-2">
        Tens algun dubte? Vols concertar un visita? Coneixer els nostres peluts?
        No dubtis en contactar-nos!
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        
        {/* Illustration */}
        <div className="hidden md:flex flex-1 justify-center">
            <img 
                src={ContactIlustration} 
                className="w-60 sm:w-80 md:w-88 max-w-full" 
                alt="Contacta amb nosaltres" 
            />
        </div>

        {/* Form */}
        <div className="flex-1 flex justify-center w-full">
        <div className="w-full max-w-full md:max-w-lg border-2 border-(--primary-color) bg-[#f6fbf4] p-6 shadow-sm rounded-lg">
            <form className="flex flex-col">
              <Stack spacing={3}>
                <TextField
                  label="Nom"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    "& label.Mui-focused": { color: "#6b945a" },
                    "& .MuiOutlinedInput-root fieldset": { borderColor: "#6b945a", borderWidth: 2 },
                  }}
                />

                <TextField
                  label="Cognom"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    "& label.Mui-focused": { color: "#6b945a" },
                    "& .MuiOutlinedInput-root fieldset": { borderColor: "#6b945a", borderWidth: 2 },
                  }}
                />

                <TextField
                  label="Correu electrònic"
                  type="email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    "& label.Mui-focused": { color: "#6b945a" },
                    "& .MuiOutlinedInput-root fieldset": { borderColor: "#6b945a", borderWidth: 2 },
                  }}
                />

                <TextField
                  label="Missatge"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& label.Mui-focused": { color: "#6b945a" },
                    "& .MuiOutlinedInput-root fieldset": { borderColor: "#6b945a", borderWidth: 2 },
                  }}
                />
              </Stack>

              <div className="flex justify-center pt-4">
                <BaseButton variant="primary">ENVIAR</BaseButton>
              </div>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
};
