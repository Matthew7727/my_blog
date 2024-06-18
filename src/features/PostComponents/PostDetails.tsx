import { useEffect, useState } from 'react';
import { Box, Typography, Grid, Stack } from "@mui/material";
import { useParams } from 'react-router-dom';
import FirebaseImage from "../../genericComponents/FirebaseImage";
import { fetchPostById, Posts } from './pstAPI';

function PostDetails() {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Posts | null>(null);
    let lastRenderedImageIndex = 1; // Start from 1 to skip the first image

    useEffect(() => {
        if (id) {
            const fetchPostData = async () => {
                const postData = await fetchPostById(id);
                setPost(postData);
            };

            fetchPostData();
        }
    }, [id]);

    if (!post) {
        return <Typography>Loading...</Typography>;
    }

    const renderText = (textArray: string[]) => {
        return textArray.map((text, index) => (
            <Typography key={index} variant="body1" sx={{ fontFamily: 'inter', marginBottom: '16px', textAlign: 'left', padding: '0 20%' }}>
                {text}
            </Typography>
        ));
    };

    const renderImages = (urls: string[], startIndex: number, endIndex: number) => {
        const imagesToRender = urls.slice(startIndex, endIndex);
        lastRenderedImageIndex = endIndex;
        return imagesToRender.map((url, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FirebaseImage imagePath={url} imageHeight="300px" />
            </Grid>
        ));
    };

    const chunks = <T,>(array: T[], size: number): T[][] => {
        const result: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const textChunks = chunks(post.mainText, 4);
    const imageChunks = chunks(post.imageUrls.slice(1), 2); // Skip the first image for the main one

    return (
        <Box>
            <Box sx={{ textAlign: 'center', marginBottom: '16px' }}>
                <Typography variant="h1" sx={{ fontFamily: 'inter', fontWeight: 'bold', marginBottom: '8px' }}>{post.title}</Typography>
                <Stack direction={'row'} spacing={1} justifyContent={'center'}>
                    <Typography variant="overline" color='text.secondary' sx={{ fontFamily: 'inter' }}>{post.dateWritten}</Typography>
                    <Typography variant="overline" color='text.secondary' sx={{ fontFamily: 'inter' }}>{post.subtitle}</Typography>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <FirebaseImage imageHeight="500px" imagePath={post.imageUrls[0]} />
            </Box>

            {textChunks.map((textChunk, index) => (
                <Box key={`text-chunk-${index}`}>
                    {renderText(textChunk)}
                    {imageChunks[index] && (
                        <Grid container spacing={2} justifyContent="center" mb={2}>
                            {renderImages(post.imageUrls, index * 2 + 1, index * 2 + 3)}
                        </Grid>
                    )}
                </Box>
            ))}
            {textChunks.length * 4 < post.mainText.length && (
                <Box>
                    {renderText(post.mainText.slice(textChunks.length * 4))}
                </Box>
            )}
            {lastRenderedImageIndex < post.imageUrls.length && (
                <Grid container spacing={2} justifyContent="center" mb={2}>
                    {renderImages(post.imageUrls, lastRenderedImageIndex, post.imageUrls.length)}
                </Grid>
            )}
        </Box>
    );
}

export default PostDetails;