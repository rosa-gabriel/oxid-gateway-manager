"use client"
import Pagination from "@/components/Pagination";
import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import StreamIcon from '@mui/icons-material/Stream';
import axios from "axios";
import Link from "next/link";

export default function UpstreamsPage() {
    return (
        <>
            <Typography color="primary" variant="h2" mb={3}>
                Upstreams
            </Typography>
            <Pagination
                getMethod={async ({ limit, offset, text }) => {
                    let { data } = await axios.get(`http://localhost:8080/upstreams?offset=${offset}&limit=${limit}&text=${text}`);

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
