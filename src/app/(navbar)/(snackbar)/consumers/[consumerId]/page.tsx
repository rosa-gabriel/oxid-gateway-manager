"use client"
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from 'notistack';
import CheckIcon from '@mui/icons-material/Check';
import ConsumerRoutesPagination from '@/components/ConsumerRoutesPagination';
import { deleteConsumer, getConsumer, putConsumer } from '@/lib/admin-requests';

export default function RoutePage() {
    const [consumer, setConsumer] = useState<any>();
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const nameRef = useRef<any>();

    const { consumerId } = useParams();

    useEffect(() => {
        (async () => {
            try {
                let data = await getConsumer(consumerId as string);

                setConsumer(data);
            } catch (e) {
                enqueueSnackbar("Consumer not found!", { variant: "error" })
                router.replace("/");
            }
        })()
    }, []);

    return (
        <>
            {consumer && (
                <>
                    <Typography color="primary" variant="h2" mb={3}>
                        Consumer Details
                    </Typography>
                    <Paper sx={{
                        mb: 3,
                        p: 3,
                        position: "relative"
                    }}>
                        <Grid container width="100%">
                            <Grid xs={2} mb={5}>
                                <Typography fontWeight={700}>
                                    Consumers Id
                                </Typography>
                                <Typography>
                                    {consumer.id}
                                </Typography>
                            </Grid>

                            <Grid xs={4}>
                                <TextField inputRef={nameRef} label="Name" defaultValue={consumer.name} sx={{ width: "90%" }} />
                            </Grid>

                            <Grid xs={4}>
                                <Typography fontWeight={700}>
                                    Api Key
                                </Typography>
                                <Typography>
                                    {consumer.api_key}
                                </Typography>
                            </Grid>

                            <Grid xs={2} sx={{
                                display: "flex",
                                justifyContent: "end",
                            }}>
                                <IconButton onClick={async () => {
                                    let consumerName = nameRef.current.value;

                                    try {
                                        let data = await putConsumer(consumer.id, {
                                            name: consumerName
                                        });

                                        enqueueSnackbar(`Consumers ${data.name} was updated!`, { variant: 'success' });
                                        setConsumer(data);
                                    } catch (e) {
                                        enqueueSnackbar(`Failed to update consumer!`, { variant: 'error' });
                                    }
                                }}>
                                    <CheckIcon color='primary' />
                                </IconButton>
                                <IconButton onClick={async () => {
                                    try {
                                        await deleteConsumer(consumerId as string);

                                        enqueueSnackbar("Deleted Consumer", { variant: 'success' });
                                        router.push("/consumers");
                                    } catch (e) {
                                        enqueueSnackbar("Failed to delete Consumers", { variant: 'error' });
                                    }
                                }}>
                                    <DeleteIcon color='primary' />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <ConsumerRoutesPagination consumerId={consumerId as string} />
                    </Paper>
                </>
            )}
        </>
    );
};
