import { Typography } from "@mui/material";
import PostGallery from "../features/PostComponents/PostsGallery";

function Entries() {
    return (
        <>
            <Typography variant='h4' noWrap sx={{ alignSelf: 'center', fontFamily: 'inter', color: 'black', fontWeight: 'bold' }} className='header-main-text'>
                Posts
            </Typography>
            <PostGallery />
        </>

    )
}

export default Entries;