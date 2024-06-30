"use client"

import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from "@/components/Pagination";
import { Box, Button, Card, CardContent, Grid, IconButton, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";

type PropsType = {
    upstreamId: number | string
}

export default function UpstreamTargetsPagination({ upstreamId }: PropsType) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [_seed, setSeed] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const newTargetName = useRef<any>();
    const newTargetPort = useRef<any>();

    const refresh = () => {
        setSeed(prevState => !prevState)
    }

    const createTarget = async () => {
        let targetName = newTargetName.current.value;
        let targetPort = newTargetPort.current.value;

        try {
            let { data } = await axios.post(`http://localhost:8080/upstreams/${upstreamId}/targets`, {
                host: targetName,
                port: parseInt(targetPort),
            });

            enqueueSnackbar(`Target ${data.name} was created!`, { variant: 'success' });
            setModalOpen(false);
        } catch (e) {
            enqueueSnackbar(`Failed to crate target!`, { variant: 'error' });
        }
    }

    return (
        <>
            <Typography color="primary" variant="h5" mb={3}>
                Targets
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
                            Create Target
                        </Typography>
                        <TextField inputRef={newTargetName} sx={{ mb: 2 }} label="Host" />
                        <TextField inputRef={newTargetPort} label="Port" />
                        <Button sx={{ mt: 3 }} variant="contained" onClick={createTarget}>
                            SAVE
                        </Button>
                    </Stack>
                </Paper>
            </Modal>
            <Pagination
                onNew={() => setModalOpen(true)}
                getMethod={async ({ limit, offset, text }) => {
                    let { data } = await axios.get(`http://localhost:8080/upstreams/${upstreamId}/targets?offset=${offset}&limit=${limit}&text=${text}`);

                    return {
                        items: data.items,
                        count: data.count
                    }
                }}
                renderItem={(item) => (
                    <Card key={item.name}
                        variant="outlined"
                        sx={{
                            mb: 1,
                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                    >
                        <CardContent sx={{ display: "flex", padding: 2, justifyContent: "space-between", alignItems: "center" }}>
                            <Box display="flex" alignItems={"center"} flexGrow={1}>
                                <CrisisAlertIcon />
                                <Grid container ml={3} flexGrow={1}>
                                    <Grid xs={4}>
                                        <Typography fontWeight={700}>
                                            Protocol
                                        </Typography>
                                        <Typography>
                                            http
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography fontWeight={700}>
                                            Host
                                        </Typography>
                                        <Typography>
                                            {item.host}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography fontWeight={700}>
                                            Port
                                        </Typography>
                                        <Typography>
                                            {item.port}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Box>
                            <IconButton sx={{ alignSelf: "end" }} onClick={async () => {
                                try {
                                    await axios.delete(`http://localhost:8080/upstreams/${upstreamId}/targets/${item.id}`);

                                    enqueueSnackbar("Deleted target", { variant: 'success' });
                                    refresh()
                                } catch (e) {
                                    enqueueSnackbar("Failed to delete target", { variant: 'error' });
                                }
                            }}>
                                <DeleteIcon color='primary' />
                            </IconButton>
                        </CardContent>
                    </Card>
                )}
            />
        </>
    )
}
