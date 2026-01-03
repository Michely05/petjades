import ContactIlustration from "../../assets/img/contact-ilustration.png";
import { Stack, TextField } from "@mui/material";
import { BaseButton } from "../../components/BaseButton";
import { useState } from "react";
import axios from "axios";
import { Modal } from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { isEmpty, isValidEmail, isMessageTooLong } from "../../utils/formValidators";

export const Contact = () => {

  const { openModal, modalProps } = useModal();

  const [form, setForm] = useState({
    nom: "",
    cognom: "",
    email: "",
    missatge: ""
  });

  const validateForm = () => {
    if (isEmpty(form.nom) ||
      isEmpty(form.cognom) ||
      isEmpty(form.email) ||
      isEmpty(form.missatge)) {
      openModal({
        title: "Formulari incomplet",
        message: "Tots els camps són obligatoris.",
        type: "error"
      });
      return false;
    }

    if (!isValidEmail(form.email)) {
      openModal({
      title: "Correu invàlid",
      message: "Introdueix un correu electrònic vàlid.",
      type: "error"
      });
      return false;
    }

    if (isMessageTooLong(form.missatge)) {
      openModal({
        title: "Missatge massa llarg",
        message: "El missatge no pot superar els 250 caràcters.",
        type: "error"
      });
      return false;
    }

    return true;
  };

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post("https://localhost:7151/requests", {
        nom: form.nom,
        cognom: form.cognom,
        email: form.email,
        missatge: form.missatge,
        tipus: "general"
      });

      openModal({
        title: "Sol·licitud enviada",
        message: "La teva sol·licitud s'ha enviat correctament. Ens posarem en contacte amb tu el més aviat possible!",
        type: "success"
      });

      // reset
      setForm({
        nom: "",
        cognom: "",
        email: "",
        missatge: ""
      });

    } catch {
        openModal({
          title: "Error",
          message: "S'ha produït un error enviant la sol·licitud.",
          type: "error"
        });
    }
  };
  
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
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Nom"
                  value={form.nom}
                  onChange={(e) => handleChange("nom", e.target.value)}
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
                  value={form.cognom}
                  onChange={(e) => handleChange("cognom", e.target.value)}
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
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
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
                  value={form.missatge}
                  onChange={(e) => handleChange("missatge", e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    "& label.Mui-focused": { color: "#6b945a" },
                    "& .MuiOutlinedInput-root fieldset": { borderColor: "#6b945a", borderWidth: 2 },
                  }}
                />
              </Stack>

              <div className="flex justify-center pt-4">
                <BaseButton variant="primary" type="submit">ENVIAR</BaseButton>
              </div>
            </form>

          </div>
        </div>

      </div>

      <Modal {...modalProps} />
      
    </section>
  );
};
