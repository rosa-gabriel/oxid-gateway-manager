"use client"
import './navbar.css'
import { SnackbarProvider } from "notistack";

export default function SnackBar({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<SnackbarProvider maxSnack={5}>{children}</SnackbarProvider>)
}
