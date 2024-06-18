import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Posts } from "./pstAPI";

interface PostCardProps {
    post: Posts
}

function PostCard({ post }: PostCardProps) {
    return (
        <Card sx={{ boxShadow: 0, border: '1px solid black', borderRadius: 0 }}>
            <CardMedia component='img' image={post.imageUrls[0]} title={post.title} />
            <CardContent>
                <Typography gutterBottom variant="h5" component='div' sx={{ fontFamily: 'inter', fontWeight: 'bold', textAlign: 'left' }}>
                    {post.title}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'inter', textAlign: 'left' }}>
                    {post.subtitle}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' sx={{ color: 'black' }}>Read More</Button>
            </CardActions>
        </Card>
    )
}

export default PostCard