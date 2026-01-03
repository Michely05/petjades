import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Animal } from "../../types/Animal";
import axios from "axios";
import passosAdopcio from "../../assets/img/passos-adopcio.png";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { BaseButton } from "../../components/BaseButton";
import { Modal } from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { isEmpty, isValidEmail, isMessageTooLong } from "../../utils/formValidators";

export const AnimalPresentation = () => {

    const {id} = useParams();
    const [animal, setAnimal] = useState<Animal | null>(null);
    const [purpose, setPurpose] = useState("");
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

        if (!purpose) {
            openModal({
            title: "Falta selecció",
            message: "Has de seleccionar si estàs interessat/da en adopció o acollida.",
            type: "error"
            });
            return false;
        }

        return true;
    };

    useEffect(() => {
        axios.get<Animal>(`https://localhost:7151/animals/${id}`)
            .then(response => {
                setAnimal(response.data);
            })
            .catch(() => {
                openModal({
                    title: "Error",
                    message: "No s'ha pogut carregar la informació de l'animal.",
                    type: "error"
                });
            });
    }, [id, openModal]);

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
                tipus: purpose,
                animalId: animal?.id
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
                missatge: "",
            });
            
            setPurpose("");

        } catch {
            openModal({
                title: "Error",
                message: "S'ha produït un error enviant la sol·licitud.",
                type: "error"
            });
        }
    };


    if (!animal) {
        return (
            <div className="text-center py-20 text-lg">
            Carregant informació de l'animal...
            </div>
        );
    }

    return (
        <>
            <section className="px-4 sm:px-8 md:px-16 lg:px-75 py-14">
                <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                    HOLA, EM DIC {animal ? animal.nom.toUpperCase() : ""}!
                </h2>
                <div className="border-2 border-[#6b945a] rounded-md p-8 bg-[#f4f9ef] grid grid-cols-1 md:grid-cols-5 gap-10">

                    <div className="md:col-span-2 flex justify-center">
                        <img
                            src={`https://localhost:7151${animal?.imatgeUrl}`}
                            alt={animal?.nom}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    <div className="md:col-span-3 space-y-4 text-lg sm:text-xl">
                        <p>
                            <span className="font-semibold text-[#6b945a]">Sobre mi:</span>{" "}
                            {animal.descripcio}
                        </p>

                        <p>
                            <span className="font-semibold text-[#6b945a]">Disponible per:</span>{" "}
                            {animal.estat}
                        </p>

                        <p>
                            <span className="font-semibold text-[#6b945a]">Gènere:</span>{" "}
                            {animal.genere}
                        </p>

                        <p>
                            <span className="font-semibold text-[#6b945a]">Edat:</span>{" "}
                            {animal.edat}
                        </p>

                        <p>
                            <span className="font-semibold text-[#6b945a]">Mida:</span>{" "}
                            {animal.mida}
                        </p>
                    </div>
                </div>
            </section>
            <section className="px-4 sm:px-8 md:px-16 lg:px-75 pb-14">
                <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                    AQUÍ TENS MÉS FOTOS MEVES
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1,2,3].map(i => (
                    <img
                    key={i}
                    src={`https://localhost:7151${animal.imatgeUrl}`}
                    alt={animal.nom}
                    className="w-full h-[480px] object-cover"
                    />
                ))}
                </div>
            </section>

            <section className="px-4 sm:px-8 md:px-16 lg:px-75 pb-14">
                <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                    REQUISITS PER ADOPTAR O ACOLLIR
                </h2>
                <div>
                    <p className="text-lg sm:text-xl md:text-2xl">Las persona sol·licitant ha de complir amb els següents aspectes abans d'adoptar 
                        o acollir un dels nostres animals:
                    </p>
                    <ul className="list-disc list-inside space-y-4 pt-5 text-lg sm:text-xl md:text-2xl">
                        <li>Ser major d'edat a l'hora d'iniciar el procés.</li>
                        <li>Aportar document d'identitat.</li>
                        <li>En el cas d'adopció, abonar les taxes que inclouen desparasitació,esterilització, microxip i vacunes.</li>
                        <li>Disposar d'un habitatge adequat i segur per a l'animal.</li>
                        <li>Mostrar compromís, responsabilitat i afecte envers l'animal.</li>
                    </ul>
                </div>
            </section>

            <section className="px-4 sm:px-8 md:px-16 lg:px-75 pb-14">
                <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                    PASSOS A SEGUIR
                </h2>
                <div>
                    <img src={passosAdopcio} alt="Passos a seguir per adoptar o acollir" className="w-full h-auto"/>
                </div>
            </section>

            <section className="px-4 sm:px-8 md:px-16 lg:px-75 pb-14">
                <h2 className="font-title font-bold flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-8 text-(--primary-color) text-center">
                    EM DONES UNA OPORTUNITAT?
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
                                    label="Missatge"
                                    value={form.missatge}
                                    onChange={(e) => handleChange("missatge", e.target.value)}
                                    multiline
                                    rows={4}
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

                                <FormControl>
                                    <FormLabel
                                        sx={{
                                        color: "#6b945a",
                                        fontWeight: 600,
                                        "&.Mui-focused": { color: "#6b945a" }
                                        }}
                                    >
                                        Estàs interessat/da en:
                                    </FormLabel>

                                    <RadioGroup row value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                                        <FormControlLabel value="adopcio" control={<Radio sx={{color: "#6b945a","&.Mui-checked": { color: "#6b945a" }}} />} label="Adopció" />

                                        <FormControlLabel value="acollida" control={<Radio sx={{color: "#6b945a", "&.Mui-checked": { color: "#6b945a" }}} />} label="Acollida" />
                                    </RadioGroup>
                                </FormControl>
                            </Stack>

                            <div className="flex justify-center pt-4">
                                <BaseButton className="w-full sm:w-auto" variant="primary" type="submit">
                                    ENVIAR
                                </BaseButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Modal {...modalProps} />

        </>
    );
}