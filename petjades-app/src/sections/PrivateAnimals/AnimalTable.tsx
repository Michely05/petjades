import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../../components/ConfirmModal";
import { Modal } from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { API_URL } from "../../config/api";

interface Animal {
  id: number;
  nom: string;
  especie: string;
  genere: string;
  edat: number;
  mida: string;
}

export const AnimalTable = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {openModal, modalProps} = useModal();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [animalToDelete, setAnimalToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`https://${API_URL}/animals`, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => setAnimals(res.data))
    .catch(err => console.error("ERROR loading animals:", err));
  }, []);

  const confirmDelete = async () => {
    if (!animalToDelete) return;

    try {
      await axios.delete(`https://${API_URL}/animals/${animalToDelete}`, {
        headers: { Authorization: "Bearer " + token }
      });

      setAnimals((prev) => prev.filter((a) => a.id !== animalToDelete));

      openModal({
        title: "Animal eliminat",
        message: "La fitxa de l'animal s'ha eliminat correctament.",
        type: "success"
      });

    } catch (error) {
        openModal({
        title: "Error",
        message: "No s'ha pogut eliminar la fitxa de l'animal.",
        type: "error"
      });

    } finally {
      setConfirmOpen(false);
      setAnimalToDelete(null);
    }
  };

  return (
    <div className="p-8">
      <table className="w-full text-left border-collapse shadow-sm bg-white">
        <thead>
          <tr className="border-b bg-[--primary-color]">
            <th className="p-3">NOM</th>
            <th className="p-3">ESPÈCIE</th>
            <th className="p-3">GÈNERE</th>
            <th className="p-3">EDAT</th>
            <th className="p-3">MIDA</th>
            <th className="p-3 text-center">ACCIONS</th>
          </tr>
        </thead>

        <tbody>
          {animals.map(a => (
            <tr key={a.id} className="border-b">
              <td className="p-3">{a.nom}</td>
              <td className="p-3">{a.especie}</td>
              <td className="p-3">{a.genere}</td>
              <td className="p-3">{a.edat}</td>
              <td className="p-3">{a.mida}</td>

              <td className="p-2 flex justify-center gap-3">
                <button className="text-blue-600 hover:text-blue-800 cursor-pointer" onClick={() => navigate(`/dashboard/update-animal/${a.id}`)}>
                  Edit
                </button>

                <button className="text-red-600 hover:text-red-800 cursor-pointer"
                onClick={() => {setAnimalToDelete(a.id); setConfirmOpen(true);}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal {...modalProps} />

      <ConfirmModal
        obert={confirmOpen}
        titol="Eliminar animal"
        missatge="Estàs segur que vols eliminar aquesta mascota? Aquesta acció no es pot desfer."
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setAnimalToDelete(null);
        }}
      />
    </div>
  );
};
