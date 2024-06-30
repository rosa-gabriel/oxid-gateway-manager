import { AppBar, Box, Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import StreamIcon from '@mui/icons-material/Stream';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import './navbar.css'
import { auth, signIn, signOut } from "../auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NavBarLayour({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const drawerWidth = 240;
    const session = await auth();

    if (session) {
        if (session?.error === "RefreshAccessTokenError") {
            signIn("keycloak", { redirectTo: "/" });
        } else {
            return (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <AppBar position="static" sx={{
                        display: "flex",
                        position: "fixed",
                        justifyContent: "center",
                        backgroundColor: "white",
                        color: "black",
                        boxShadow: "0 0 15px 5px #f1f0f7",
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}>
                        <Toolbar sx={{
                            display: "flex",
                            justifyContent: "end"
                        }}>
                            <Box display={"flex"} marginRight="30px">
                                <Icon sx={{ marginRight: "10px" }}>
                                    <AccountCircleIcon />
                                </Icon>
                                <Typography>
                                    {session.user?.name}
                                </Typography>
                            </Box>

                            <form action={async () => {
                                "use server"
                                await signOut({
                                    redirectTo: "/login"
                                })
                            }}>
                                <IconButton type="submit" sx={{ mr: "10px" }}>
                                    <LogoutIcon />
                                </IconButton>
                            </form>
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                        aria-label="mailbox folders"
                    >
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 0, backgroundColor: "#F36D00", padding: "10px" },
                            }}
                            open
                        >
                            <Typography marginTop={2} fontWeight={700} display="flex" justifyContent={"center"} marginBottom={5} sx={{ color: "white" }}>
                                Oxid Gateway
                            </Typography>
                            <List>
                                <ListItemButton LinkComponent={Link} href="/upstreams">
                                    <ListItemIcon>
                                        <StreamIcon sx={{ color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: "white" }}>
                                        Upstreams
                                    </ListItemText>
                                </ListItemButton>
                                <ListItemButton LinkComponent={Link} href="/consumers">
                                    <ListItemIcon>
                                        <AccountBoxIcon sx={{ color: "white" }} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: "white" }}>
                                        Consumers
                                    </ListItemText>
                                </ListItemButton>
                            </List>
                        </Drawer>
                    </Box>
                    <Box sx={{
                        mt: 6,
                        ml: { sm: `${drawerWidth}px` },
                        padding: 5
                    }}>
                        {children}
                    </Box>
                </Box >
            );
        }
    } else {
        redirect("/login");
    }
}
