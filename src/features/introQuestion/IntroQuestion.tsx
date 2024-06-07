import { Button, Stack, TextField, Typography } from "@mui/material";


function IntroQuestion() {
    return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Typography variant='h2' noWrap
                    sx={{
                        fontFamily: 'inter',
                        fontWeight: 'bold',
                        color: 'black',
                        marginBottom: '16px'
                    }}
                >
                    Hello there....
                </Typography>
                <Typography
                    variant="subtitle2" noWrap
                    sx={{
                        fontFamily: 'inter',
                        fontWeight: 'bold',
                        color: 'gray',
                        marginBottom: '16px'
                    }}
                >
                    What's brought you here today friend?
                </Typography>
                <Stack direction={"row"} spacing={1}>
                    <TextField variant='outlined' />
                    <Button sx={{ backgroundColor:'darkgreen', color:'white', fontWeight:'bold' }}>
                        Enter
                    </Button>
                </Stack>
            </Stack>
    )
}

export default IntroQuestion