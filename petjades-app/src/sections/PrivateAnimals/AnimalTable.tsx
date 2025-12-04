import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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

  useEffect(() => {
    axios.get("https://localhost:7151/animals", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => setAnimals(res.data))
    .catch(err => console.error("ERROR loading animals:", err));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Segur que vols eliminar aquest animal?")) return;

    try {
      await axios.delete(`https://localhost:7151/animals/${id}`, {
        headers: { Authorization: "Bearer " + token }
      });

      setAnimals((prev) => prev.filter((a) => a.id !== id));

      alert("Animal eliminat correctament!");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar l'animal");
    }
  };

  return (
    <div className="p-8">
      <table className="w-full text-left border-collapse shadow-sm">
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
                <button className="text-blue-600 hover:text-blue-800" onClick={() => navigate(`/dashboard/update-animal/${a.id}`)}>
                  Edit
                </button>

                <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(a.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
