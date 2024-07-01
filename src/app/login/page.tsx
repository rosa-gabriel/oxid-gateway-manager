import { signIn } from "@/app/auth"
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Box, Button, Grid, Paper, Stack, Typography, useTheme } from "@mui/material"


export default function LoginPage() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: '100vh',
                backgroundColor: "#F36D00",
            }}
        >
            <Grid item xs={3}>
                <Stack component={Paper} sx={{
                    p: 4,
                    minWidth: 400,
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Typography variant="h2" fontWeight={700} mb={2} sx={{
                        color: "#F36D00"
                    }}>
                        Oxid Gateway
                    </Typography>
                    <Typography mb={2}>
                        Sign Up Using
                    </Typography>
                    <form
                        style={{
                            width: "100%"
                        }}
                        action={async () => {
                            "use server"
                            await signIn("keycloak", { redirectTo: "/" })
                        }}
                    >
                        <Button variant="contained" fullWidth type="submit">Sign In</Button>
                    </form>
                </Stack>
            </Grid>
        </Grid>
    )
}
