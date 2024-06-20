import { Typography } from "@mui/material";
import PostGallery from "../features/PostComponents/PostsGallery";


function Entries() {
    return (
        <>
            <Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center', fontFamily: 'inter', fontWeight: 'bold' }}>
                Posts
            </Typography>
            <PostGallery />
        </>

    )
}

export default Entries;