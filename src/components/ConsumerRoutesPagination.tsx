"use client"

import ForkRightIcon from '@mui/icons-material/ForkRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from "@/components/Pagination";
import { Box, Button, Card, CardContent, Grid, IconButton, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { deleteConsumerRoute, getConsumerRoutes, linkConsumerToRoute } from '@/lib/admin-requests';

type PropsType = {
    consumerId: number | string
}

export default function ConsumerRoutesPagination({ consumerId }: PropsType) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [_seed, setSeed] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const newRouteId = useRef<any>();

    const refresh = () => {
        setSeed(prevState => !prevState)
    }

    const createRoute = async () => {
        const routeId = newRouteId.current.value;

        try {
            await linkConsumerToRoute(consumerId, routeId);

            enqueueSnackbar(`Consumer was liked to route!`, { variant: 'success' });
            setModalOpen(false);
        } catch (e) {
            enqueueSnackbar(`Failed to link to route!`, { variant: 'error' });
        }
    }

    return (
        <>
            <Typography color="primary" variant="h5" mb={3} mt={2}>
                Routes
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
                            Link to Route
                        </Typography>
                        <TextField inputRef={newRouteId} sx={{ mb: 2 }} label="Route ID" />
                        <Button sx={{ mt: 3 }} variant="contained" onClick={createRoute}>
                            SAVE
                        </Button>
                    </Stack>
                </Paper>
            </Modal>
            <Pagination
                onNew={() => setModalOpen(true)}
                getMethod={async (pagination) => {
                    let data = await getConsumerRoutes(consumerId, pagination);

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
                                <ForkRightIcon />
                                <Grid container ml={3} flexGrow={1}>
                                    <Grid xs={4}>
                                        <Typography fontWeight={700}>
                                            Path
                                        </Typography>
                                        <Typography>
                                            {item.path}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography fontWeight={700}>
                                            Inner Path
                                        </Typography>
                                        <Typography>
                                            {item.inner_path ?? '-'}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={4}>
                                        <Typography fontWeight={700}>
                                            Private
                                        </Typography>
                                        <Typography>
                                            {item.private ? "true" : "false"}
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Box>
                            <IconButton sx={{ alignSelf: "end" }} onClick={async () => {
                                try {
                                    await deleteConsumerRoute(consumerId, item.id);

                                    enqueueSnackbar("Unliked consumer to route", { variant: 'success' });
                                    refresh()
                                } catch (e) {
                                    enqueueSnackbar("Failed to unlink consumer to route", { variant: 'error' });
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
