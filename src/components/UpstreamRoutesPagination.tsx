"use client"

import ForkRightIcon from '@mui/icons-material/ForkRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from "@/components/Pagination";
import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, Grid, IconButton, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import { deleteUpstreamRoute, getUpstreamRoutes, postRoute, postTarget } from '@/lib/admin-requests';

type PropsType = {
    upstreamId: number | string
}

export default function UpstreamRoutesPagination({ upstreamId }: PropsType) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [_seed, setSeed] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const newRoutePath = useRef<any>();
    const newInnerPath = useRef<any>();
    const newPrivate = useRef<any>();

    const refresh = () => {
        setSeed(prevState => !prevState)
    }

    const createRoute = async () => {
        let path = newRoutePath.current.value;
        let innerPath = newInnerPath.current.value;
        let isPrivate = newPrivate.current.checked;

        try {
            let data = await postRoute(upstreamId, {
                path,
                inner_path: innerPath.length === 0 ? undefined : innerPath,
                private: isPrivate,
            });

            enqueueSnackbar(`Route ${data.name} was created!`, { variant: 'success' });
            setModalOpen(false);
        } catch (e) {
            enqueueSnackbar(`Failed to crate route!`, { variant: 'error' });
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
                            Create Route
                        </Typography>
                        <TextField inputRef={newRoutePath} sx={{ mb: 2 }} label="Path" />
                        <TextField inputRef={newInnerPath} sx={{ mb: 2 }} label="Inner Path" />
                        <FormControlLabel control={<Checkbox inputRef={newPrivate} />} label="Private" />
                        <Button sx={{ mt: 3 }} variant="contained" onClick={createRoute}>
                            SAVE
                        </Button>
                    </Stack>
                </Paper>
            </Modal>
            <Pagination
                onNew={() => setModalOpen(true)}
                getMethod={async (pagination) => {
                    let data = await getUpstreamRoutes(upstreamId, pagination);

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
                                    <Grid xs={3}>
                                        <Typography fontWeight={700}>
                                            Route Id
                                        </Typography>
                                        <Typography>
                                            {item.id}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={3}>
                                        <Typography fontWeight={700}>
                                            Path
                                        </Typography>
                                        <Typography>
                                            {item.path}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={3}>
                                        <Typography fontWeight={700}>
                                            Inner Path
                                        </Typography>
                                        <Typography>
                                            {item.inner_path ?? '-'}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={3}>
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
                                    await deleteUpstreamRoute(upstreamId, item.id);

                                    enqueueSnackbar("Deleted route", { variant: 'success' });
                                    refresh()
                                } catch (e) {
                                    enqueueSnackbar("Failed to delete route", { variant: 'error' });
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
