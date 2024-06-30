"use client"
import Pagination from "@/components/Pagination";
import { Box, Card, CardContent, Typography } from "@mui/material";
import StreamIcon from '@mui/icons-material/Stream';
import axios from "axios";

export default function UpstreamsPage() {
    return (
        <>
            <Pagination
                getMethod={async ({ limit, offset, text }) => {
                    let { data } = await axios.get(`http://localhost:8080/upstreams?offset=${offset}&limit=${limit}&text=${text}`);
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
                            <StreamIcon />
                            <Box sx={{
                                ml: 3,
                            }}>
                                <Typography fontWeight={700} fontSize={20}>
                                    {item.name}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            />
        </>
    );
}
