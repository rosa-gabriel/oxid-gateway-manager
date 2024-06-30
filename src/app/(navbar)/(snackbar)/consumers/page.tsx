"use client"
import Pagination from "@/components/Pagination";
import { Box, Button, Card, CardActionArea, CardContent, Modal, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import { useSnackbar } from "notistack";

export default function ConsumersPage() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const newConsumerName = useRef<any>();

    const createConsumer = async () => {
        let consumerName = newConsumerName.current.value;

        try {
            let { data } = await axios.post(`http://localhost:8080/consumers`, {
                name: consumerName
            });

            enqueueSnackbar(`Consumer ${data.name} was created!`, { variant: 'success' });
            setModalOpen(false);
        } catch (e) {
            enqueueSnackbar(`Failed to crate consumer!`, { variant: 'error' });
        }
    }

    return (
        <>
            <Typography color="primary" variant="h2" mb={3}>
                Consumers
            </Typography>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "30%",
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Stack>
                        <Typography color="primary" variant="h4" mb={3}>
                            Create Consumer
                        </Typography>
                        <TextField inputRef={newConsumerName} label="Name" />
                        <Button sx={{ mt: 3 }} variant="contained" onClick={createConsumer}>
                            SAVE
                        </Button>
                    </Stack>
                </Paper>
            </Modal>
            <Pagination
                onNew={() => setModalOpen(true)}
                getMethod={async ({ limit, offset, text }) => {
                    let { data } = await axios.get(`http://localhost:8080/consumers?offset=${offset}&limit=${limit}&text=${text}`);

                    return {
                        items: data.items,
                        count: data.count
                    }
                }}
                renderItem={(item) => (
                    <Card key={item.name}
                        variant="outlined"
                        sx={{
                            mb: 2,
                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                    >
                        <CardActionArea LinkComponent={Link} href={`/consumers/${item.id}`}>
                            <CardContent sx={{ display: "flex", padding: 3, alignItems: "center" }}>
                                <AccountBoxIcon />
                                <Box sx={{
                                    ml: 3,
                                }}>
                                    <Typography fontWeight={700} fontSize={20}>
                                        {item.name}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )}
            />
        </>
    );
}
