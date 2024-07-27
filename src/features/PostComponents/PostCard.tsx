import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Posts } from "./pstAPI";
import blogPostImage from '../../assets/blogPost.png';
import articleImage from '../../assets/article.png';

interface PostCardProps {
    post: Posts;
}

function PostCard({ post }: PostCardProps) {
    const navigate = useNavigate();

    const handleReadMore = () => {
        navigate(`/entries/${post.id}`);
    };

    // Determine the image to display
    const imageUrl = post.imageUrls && post.imageUrls.length > 0
        ? post.imageUrls[0]
        : post.postType === 'blog'
            ? blogPostImage
            : articleImage;

    return (
        <Card sx={{ boxShadow: 0, border: '1px solid black', borderRadius: 0 }}>
            <CardMedia component='img' image={imageUrl} title={post.title} />
            <CardContent>
                <Typography gutterBottom variant="h5" component='div' sx={{ fontFamily: 'inter', fontWeight: 'bold', textAlign: 'left' }}>
                    {post.title}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'inter', textAlign: 'left' }}>
                    {post.subtitle}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' sx={{ color: 'black' }} onClick={handleReadMore}>Read More</Button>
            </CardActions>
        </Card>
    );
}

export default PostCard;
