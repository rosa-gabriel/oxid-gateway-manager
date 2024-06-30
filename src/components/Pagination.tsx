"use client"
import SearchBar from "@/components/SearchBar";
import { Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

type PaginationParams = {
    limit: number,
    offset: number,
    text: string,
}

type Props = {
    getMethod: (pagination: PaginationParams) => Promise<any[]>,
    renderItem: (item: any) => ReactNode,
}

export default function Pagination({ getMethod, renderItem }: Props) {
    let [items, setItems] = useState<any[]>([]);
    let [loading, setLoading] = useState<boolean>(false);

    let [pagination, setPagination] = useState<PaginationParams>({
        limit: 10,
        offset: 0,
        text: "",
    });

    useEffect(() => {
        setLoading(true);
        getMethod(pagination)
            .then((result) => {
                setItems(result);
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
            <SearchBar setText={(newValue) => {
                setPagination((prevState) => ({
                    ...prevState,
                    text: newValue
                }))
            }} />
            <Box sx={{ mt: 5 }}>
                {items.map(renderItem)}
            </Box>
        </>
    );
}
