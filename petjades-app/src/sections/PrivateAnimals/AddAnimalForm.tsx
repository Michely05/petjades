import { TextField, MenuItem } from "@mui/material";
import { BaseButton } from '../../components/BaseButton';
import axios from "axios";
import { useRef, useState } from "react";

export const AddAnimalForm = () => {
    const initialForm = {
      nom: "",
      especie: "",
      genere: "",
      edat: "",
      mida: "",
      estat: ""
  };

  const [image, setImage] = useState<File | null>(null);
  const [form, setForm] = useState(initialForm);

  const token = localStorage.getItem("token");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetForm = () => {
    setForm(initialForm);
    setImage(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }

      await axios.post("https://localhost:7151/animals", formData, {
        headers: { 
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Animal creat correctament!");
      resetForm();
    } catch {
      alert("Error al crear animal");
    }
  };

  const updateField = (key: string, value: string) =>
    setForm({ ...form, [key]: value });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImage(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-xl border-2 border-[#6b945a] bg-[#f6fbf4] rounded-lg p-8 shadow-sm">

        <h2 className="text-center text-xl font-bold text-(--primary-color) mb-4">NOU ANIMAL</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <TextField label="Nom" value={form.nom} variant="outlined" size="small" fullWidth sx={inputStyle} onChange={(e) => updateField("nom", e.target.value)}/>

          <div className="grid grid-cols-2 gap-4">
            <TextField select label="Espècie" value={form.especie} size="small" sx={inputStyle} onChange={(e) => updateField("especie", e.target.value)}>
                <MenuItem value="gos">Gos</MenuItem>
                <MenuItem value="gat">Gat</MenuItem>
            </TextField>

            <TextField select label="Gènere" value={form.genere} size="small" sx={inputStyle} onChange={(e) => updateField("genere", e.target.value)}>
                <MenuItem value="mascle">Mascle</MenuItem>
                <MenuItem value="femella">Femella</MenuItem>
            </TextField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField select label="Edat" value={form.edat} size="small" sx={inputStyle} onChange={(e) => updateField("edat", e.target.value)}>
                <MenuItem value="cadell">Cadell</MenuItem>
                <MenuItem value="adult">Adult</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
            </TextField>

            <TextField select label="Mida" value={form.mida} size="small" sx={inputStyle} onChange={(e) => updateField("mida", e.target.value)}>
                <MenuItem value="petit">Petit</MenuItem>
                <MenuItem value="mitja">Mitjà</MenuItem>
                <MenuItem value="gran">Gran</MenuItem>
            </TextField>
          </div>

          <TextField select label="Estat" value={form.estat} size="small" sx={inputStyle} onChange={(e) => updateField("estat", e.target.value)}>
                <MenuItem value="adopcio">En adopció</MenuItem>
                <MenuItem value="acollida">Acollida</MenuItem>
                <MenuItem value="pendent">Pendent</MenuItem>
          </TextField>

          <div 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={openFileDialog}
            className="border-2 border-dashed border-[#6b945a] rounded-md h-40 flex flex-col items-center justify-center text-center text-sm text-[#6b945a] cursor-pointer hover:bg-[#e7f2e3] transition"
          >
            <span className="font-medium">Arrossega aquí les teves imatges</span>
            <span className="text-xs opacity-70">o navega</span>

            {image && (
              <img 
                src={URL.createObjectURL(image)} 
                alt="preview"
                className="mt-3 h-20 object-cover rounded"
              />
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <BaseButton variant="primary" type="submit">CREAR</BaseButton>

        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  "& label.Mui-focused": { color: "#6b945a" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#6b945a", borderWidth: "2px" },
    "&:hover fieldset": { borderColor: "#6b945a" },
    "&.Mui-focused fieldset": { borderColor: "#6b945a" }
  }
};