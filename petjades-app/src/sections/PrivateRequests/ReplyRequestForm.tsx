import { TextField, MenuItem } from "@mui/material";
import { BaseButton } from '../../components/BaseButton';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { inputStyle } from "../../components/InputStyle";
import { Modal } from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { isEmpty, isValidEmail, isMessageTooLong } from "../../utils/formValidators";
import { useNavigate, useParams } from "react-router-dom";

export const ReplyRequestForm = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { openModal, modalProps } = useModal();

  const [request, setRequest] = useState<any>(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    axios.get(`https://localhost:7151/requests/${id}`, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => {
      setRequest(res.data);
      setReply(res.data.resposta || "");
    })
    .catch(() => {
      openModal({
        title: "Error",
        message: "No s'ha pogut carregar la sol·licitud.",
        type: "error",
        onClose: () => navigate("/dashboard/private-requests")
      });
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reply.trim()) {
      openModal({
        title: "Resposta buida",
        message: "Has d'escriure una resposta abans d'enviar.",
        type: "error"
      });
      return;
    }

    try {
      await axios.post(
        `https://localhost:7151/requests/${id}/reply`,
        { resposta: reply },
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      openModal({
        title: "Resposta enviada",
        message: "La resposta s'ha enviat correctament al sol·licitant.",
        type: "success",
        onClose: () => navigate("/dashboard/sollicituds")
      });

    } catch {
      openModal({
        title: "Error",
        message: "No s'ha pogut enviar la resposta.",
        type: "error"
      });
    }
  };

  if (!request) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-lg text-gray-600">Carregant sol·licitud...</p>
      </div>
    );
  }


  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-xl border-2 border-[#6b945a] bg-[#f6fbf4] rounded-lg p-8 shadow-sm">

        <h2 className="text-center text-xl font-bold text-(--primary-color) mb-4">SOL·LICITUD NÚMERO #{request.id}</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          <TextField label="Nom del sol·licitant" value={request.nom} sx={inputStyle} disabled />
          <TextField label="Email del sol·licitant" value={request.email} sx={inputStyle} disabled />
          <TextField label="Tipus de sol·licitud" value={request.tipus} sx={inputStyle} disabled />
          <TextField label="Animal" value={request.animalNom ?? "-" } sx={inputStyle} disabled />

          <TextField
            label="Missatge del sol·licitant"
            value={request.missatge}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            sx={inputStyle}
            disabled
            //max-Length={500}
          />

          <TextField
            label="Resposta al sol·licitant"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            sx={inputStyle}
            required
            //max-Length={500}
          />

          <BaseButton variant="primary" type="submit">ENVIAR</BaseButton>

        </form>
      </div>

      <Modal {...modalProps} />
    </div>
  );
};