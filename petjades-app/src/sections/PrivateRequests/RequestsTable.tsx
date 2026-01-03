import { useEffect, useState } from "react";
import axios from "axios";
import { Request } from "../../types/Request";
import { Modal } from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

export const RequestsTable = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const token = localStorage.getItem("token");
  const { openModal, modalProps } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/requests`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => setRequests(res.data))
    .catch(() => {
      openModal({
        title: "Error",
        message: "Error carregant les sol·licituds. Si us plau, torna-ho a intentar.",
        type: "error"
      });
    });
  }, []);
  
  return (
    <>
      <div className="p-8">
        <table className="w-full text-left border-collapse shadow-sm bg-white">
          <thead>
            <tr className="border-b bg-[--primary-color]">
              <th className="p-3">NOM</th>
              <th className="p-3">EMAIL</th>
              <th className="p-3">TIPUS</th>
              <th className="p-3">ANIMAL</th>
              <th className="p-3">ESTAT</th>
              <th className="p-3 text-center">ACCIONS</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(req => (
              <tr key={req.id} className="border-b">
                <td className="p-3">{req.nom}</td>
                <td className="p-3">{req.email}</td>
                <td className="p-3">{req.tipus}</td>
                <td className="p-3">{req.animalNom ?? "—"}</td>
                <td className="p-3">
                  {req.resposta ? (
                    <span className="text-green-600 font-semibold">
                      Contestada
                    </span>
                  ) : (
                    <span className="text-orange-500 font-semibold">
                      Pendent
                    </span>
                  )}
                </td>

                <td className="p-2 flex justify-center gap-3">
                  <button className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => navigate(`/dashboard/private-requests/reply/${req.id}`)}>
                    Respondre
                  </button>

                  <button className="text-red-600 hover:text-red-800 cursor-pointer">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <p className="text-center py-6 text-gray-500">No hi ha sol·licituds</p>
        )}
      </div>

      <Modal {...modalProps} />
      
    </>
  );
};
