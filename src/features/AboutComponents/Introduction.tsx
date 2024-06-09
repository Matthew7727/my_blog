import { Typography } from "@mui/material";

function Introduction() {
    return (
        <>
            <Typography variant='h4' noWrap sx={{ alignSelf: 'center', fontFamily: 'inter', color: 'black', fontWeight: 'bold' }} className='header-main-text'>
                About Me
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                Full-Stack SE | Tech Enthusiast | LGBTQ+ ERG Lead | Star Wars Nerd
            </Typography>
        </>
    )
}

export default Introduction