import { Stack, TextField } from '@mui/material';
import { BaseButton } from '../../components/BaseButton';

export const ColaborateContact = () => {
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
                    <form className="flex flex-col">
                        <Stack spacing={3}>
                            <TextField
                                label="Nom"
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
                            <BaseButton className="w-full sm:w-auto" variant="primary">
                                ENVIAR
                            </BaseButton>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
