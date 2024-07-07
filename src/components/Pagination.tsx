"use client"
import SearchBar from "@/components/SearchBar";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import MuiPagination from "@mui/material/Pagination";

export type PaginationParams = {
    limit: number,
    offset: number,
    text: string,
}

export type PaginationItems = {
    items: any[],
    count: number
}

type Props = {
    getMethod: (pagination: PaginationParams) => Promise<PaginationItems>,
    renderItem: (item: any) => ReactNode,
    onNew: () => void
}

export default function Pagination({ getMethod, renderItem, onNew }: Props) {
    let [items, setItems] = useState<any[]>([]);
    let [count, setCount] = useState<number>(0);
    let [loading, setLoading] = useState<boolean>(false);

    let [pagination, setPagination] = useState<PaginationParams>({
        limit: 6,
        offset: 0,
        text: "",
    });

    useEffect(() => {
        setLoading(true);
        getMethod(pagination)
            .then((result) => {
                setItems(result.items);
                setCount(result.count);
            })
            .catch((e) => {
                console.error(e);
                setItems([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [pagination, getMethod]);

    return (
        <>
            <Box display="flex">
                <SearchBar setText={(newValue) => {
                    setPagination((prevState) => ({
                        ...prevState,
                        text: newValue
                    }))
                }} />
                <Button onClick={onNew} variant="contained" sx={{ ml: 4 }}>
                    NEW
                </Button>
            </Box>
            <Box sx={{ mt: 5 }}>
                {!loading && (
                    <>
                        {items.length > 0 ?
                            items.map(renderItem) : <Typography sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>0 items found...</Typography>}
                        <MuiPagination page={(pagination.offset / pagination.limit) + 1} onChange={(_e, value) => {
                            setPagination((prevPagination) => ({
                                ...prevPagination,
                                offset: (value - 1) * prevPagination.limit
                            }))
                        }} sx={{ mt: 5 }} count={Math.ceil(count / pagination.limit)} />
                    </>
                )}
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </>
    );
}
