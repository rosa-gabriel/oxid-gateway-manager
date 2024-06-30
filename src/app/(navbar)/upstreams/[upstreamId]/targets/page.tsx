"use client"
import Pagination from "@/components/Pagination";
import { Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';

export default function Home() {
    let params = useParams();

    return (
        <>
            <Typography fontWeight={700} fontSize={20} mb={5}>
                {`Upstream ${params.upstreamId} - Targets`}
            </Typography>
            <Pagination
                getMethod={async ({ limit, offset }) => {
                    let { data } = await axios.get(`http://localhost:8080/upstreams/${params.upstreamId}/targets?offset=${offset}&limit=${limit}`);
                    return data.items;
                }}
                renderItem={(item) => (
                    <Card key={item.name}
                        variant="outlined"
                        sx={{
                            mb: 2,
                            '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                        }}
                    >
                        <CardContent sx={{ display: "flex", padding: 3, alignItems: "center" }}>
                            <CrisisAlertIcon />
                            <Box sx={{
                                ml: 3,
                            }}>
                                <Typography fontWeight={700} fontSize={20}>
                                    {`${item.host}:${item.port}`}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            />
        </>
    );
}
