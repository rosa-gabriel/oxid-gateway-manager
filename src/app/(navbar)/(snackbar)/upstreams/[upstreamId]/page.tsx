"use client"
import DeleteIcon from '@mui/icons-material/Delete';
import UpstreamTargetsPagination from "@/components/UpstreamTargetsPagination";
import { Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from 'notistack';
import CheckIcon from '@mui/icons-material/Check';
import UpstreamRoutesPagination from '@/components/UpstreamRoutesPagination';
import { deleteUpstream, getUpstream, putUpstream } from '@/lib/admin-requests';

export default function UpstreamPage() {
    const [upstream, setUpstream] = useState<any>();
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const nameRef = useRef<any>();

    const { upstreamId } = useParams();

    useEffect(() => {
        (async () => {
            try {
                let data = await getUpstream(upstreamId as string);

                setUpstream(data);
            } catch (e) {
                enqueueSnackbar("Upstream not found!", { variant: "error" })
                router.replace("/");
            }
        })()
    }, []);

    return (
        <>
            {upstream && (
                <>
                    <Typography color="primary" variant="h2" mb={3}>
                        Upstream Details
                    </Typography>
                    <Paper sx={{
                        mb: 3,
                        p: 3,
                        position: "relative"
                    }}>
                        <Grid container width="100%">
                            <Grid xs={5} mb={5}>
                                <Typography fontWeight={700}>
                                    Upstream Id
                                </Typography>
                                <Typography>
                                    {upstream.id}
                                </Typography>
                            </Grid>

                            <Grid xs={5}>
                                <TextField inputRef={nameRef} label="Name" defaultValue={upstream.name} sx={{ width: "90%" }} />
                            </Grid>

                            <Grid xs={2} sx={{
                                display: "flex",
                                justifyContent: "end",
                            }}>
                                <IconButton onClick={async () => {
                                    let upstreamName = nameRef.current.value;

                                    try {
                                        let data = await putUpstream(upstream.id, {
                                            name: upstreamName
                                        });

                                        enqueueSnackbar(`Upstream ${data.name} was updated!`, { variant: 'success' });
                                        setUpstream(data);
                                    } catch (e) {
                                        enqueueSnackbar(`Failed to update upstream!`, { variant: 'error' });
                                    }
                                }}>
                                    <CheckIcon color='primary' />
                                </IconButton>
                                <IconButton onClick={async () => {
                                    try {
                                        await deleteUpstream(upstreamId as string);

                                        enqueueSnackbar("Deleted Upstream", { variant: 'success' });
                                        router.push("/upstreams");
                                    } catch (e) {
                                        enqueueSnackbar("Failed to delete Upstream", { variant: 'error' });
                                    }
                                }}>
                                    <DeleteIcon color='primary' />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <UpstreamTargetsPagination upstreamId={upstreamId as string} />
                        <UpstreamRoutesPagination upstreamId={upstreamId as string} />
                    </Paper>
                </>
            )}
        </>
    );
};
