"use client"
import Pagination from "@/components/Pagination";
import { Box, Button, Card, CardActionArea, CardContent, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import StreamIcon from '@mui/icons-material/Stream';
import Link from "next/link";
import { useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { getUpstreams, postUpstream } from "@/lib/admin-requests";

export default function UpstreamsPage() {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const newUpstreamName = useRef<any>();

    const createUpstream = async () => {
        let upstreamName = newUpstreamName.current.value;

        try {
            let data = await postUpstream({
                name: upstreamName
            });

            enqueueSnackbar(`Upstream ${data.name} was created!`, { variant: 'success' });
            router.push(`/upstreams/${data.id}`);
        } catch (e) {
            enqueueSnackbar(`Failed to crate upstream!`, { variant: 'error' });
        }
    }

    return (
        <>
            <Typography color="primary" variant="h2" mb={3}>
                Upstreams
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
                            Create Upstream
                        </Typography>
                        <TextField inputRef={newUpstreamName} label="Name" />
                        <Button sx={{ mt: 3 }} variant="contained" onClick={createUpstream}>
                            SAVE
                        </Button>
                    </Stack>
                </Paper>
            </Modal>
            <Pagination
                onNew={() => setModalOpen(true)}
                getMethod={async (pagination) => {
                    let data = await getUpstreams(pagination);

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
                        <CardActionArea LinkComponent={Link} href={`/upstreams/${item.id}`}>
                            <CardContent sx={{ display: "flex", padding: 3, alignItems: "center" }}>
                                <StreamIcon />
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
