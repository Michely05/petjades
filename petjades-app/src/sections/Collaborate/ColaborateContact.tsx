import { Stack, TextField } from '@mui/material';
import { BaseButton } from '../../components/BaseButton';
import { useState } from 'react';
import axios from 'axios';

export const ColaborateContact = () => {

    const [form, setForm] = useState({
        nom: "",
        cognom: "",
        email: "",
        missatge: ""
      });
    
      const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          await axios.post("https://localhost:7151/requests", {
            nom: form.nom,
            cognom: form.cognom,
            email: form.email,
            missatge: form.missatge,
            tipus: "colaborar"
          });
    
          alert("Missatge enviat correctament!");
    
          // reset
          setForm({
            nom: "",
            cognom: "",
            email: "",
            missatge: ""
          });
    
        } catch {
          alert("Error enviant el missatge");
        }
      };

    return (
        <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-8">
            <h2
                className="font-title font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-center"
                style={{ color: "var(--primary-color)" }}
            >
                COM VOLS COL·LABORAR?
            </h2>

            <div className="flex justify-center">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl border-2 rounded-md border-[#6b945a] bg-[#f6fbf4] p-6 shadow-sm">
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
                                    '& label.Mui-focused': { color: '#6b945a' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                        '&:hover fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                        '&.Mui-focused fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                    },
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
                                    '& label.Mui-focused': { color: '#6b945a' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                        '&:hover fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                        '&.Mui-focused fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                    },
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
                                    '& label.Mui-focused': { color: '#6b945a' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                        '&:hover fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                        '&.Mui-focused fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                    },
                                }}
                            />
                            <TextField
                                label="Com vols col·laborar?"
                                multiline
                                rows={4}
                                value={form.missatge}
                                onChange={(e) => handleChange("missatge", e.target.value)}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    '& label.Mui-focused': { color: '#6b945a' },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                        '&:hover fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                        '&.Mui-focused fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                    },
                                }}
                            />
                        </Stack>

                        <div className="flex justify-center pt-4">
                            <BaseButton className="w-full sm:w-auto" variant="primary" type='submit'>
                                ENVIAR
                            </BaseButton>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
