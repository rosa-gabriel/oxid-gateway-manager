"use client"

import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from "./styled-search";
import { useRef } from 'react';

type PropsType = {
    setText: (newText: string) => void
}

export default function SearchBar({ setText }: PropsType) {
    const searchBarRef = useRef<any>();
    return (
        <form style={{ flexGrow: 1 }} onSubmit={(value) => {
            value.preventDefault();
            setText(searchBarRef.current.value)
        }}>
            <Search sx={{ ml: "0 !important" }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputRef={searchBarRef}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </form>
    );
}
