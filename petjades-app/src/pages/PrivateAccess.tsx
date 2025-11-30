import { Stack, TextField } from '@mui/material'
import { BaseButton } from '../components/BaseButton';
import { PawIcon } from '../components/PawIcon';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const PrivateAccess = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { login } = useAuth();

        const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("https://localhost:7151/identity/login", { email, password });
            login(response.data.accessToken);
            navigate("/dashboard/private-animals");

        } catch {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#7c9a6d' }}>
            <div className="max-w-md w-full px-6 py-10 rounded-2xl shadow-sm" style={{ backgroundColor: '#f6fbf4', border: '2px solid #6b945a' }}>
                <h2 className='flex items-center justify-center font-title gap-2 mb-6 text-3xl'>
                    <span className='text-(--primary-color) font-bold'>Petjades</span><PawIcon />
                </h2>
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <Stack spacing={3}>
                        <TextField
                            label="Correu electrònic"
                            type="email"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            label="Contrasenya"
                            type="password"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{
                                '& label.Mui-focused': { color: '#6b945a'},
                                    '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                    '&:hover fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                    '&.Mui-focused fieldset': { borderColor: '#6b945a', borderWidth: '2px' },
                                },
                            }}
                        />
                    </Stack>
                    <div className="flex justify-center pt-4">
                        <BaseButton variant="primary" type="submit">
                            ENTRAR
                        </BaseButton>
                    </div>
                </form>
            </div>
        </div>
    );
};