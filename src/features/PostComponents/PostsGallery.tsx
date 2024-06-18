import { Divider, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import PostCard from "./PostCard"
import { Posts, fetchPostsByType } from "./pstAPI"


    function PostGallery() {

        const [blogPosts, setBlogPosts] = useState<Posts[]>([])
        const [articlePosts, setArticlePosts] = useState<Posts[]>([])

        useEffect(() => {
            const fetchPosts = async () => {
                const articles = await fetchPostsByType('articles');
                setArticlePosts(articles)

                const blogPosts = await fetchPostsByType('blogPosts');
                setBlogPosts(blogPosts)
            }

            fetchPosts();
        }, [])

        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{fontFamily: 'inter', fontWeight: 'bold'}}>Blog</Typography>
                </Grid>
                {blogPosts.map((post) => (
                    <Grid item xs={3}>
                        <PostCard post={post} />
                    </Grid>
                ))}
                <Divider />
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{fontFamily: 'inter', fontWeight: 'bold'}}>Articles</Typography>
                </Grid>
                {articlePosts.map((post) => (
                    <Grid item xs={2}>
                        <PostCard post={post} />
                    </Grid>
                ))}
            </Grid>
        )
}

    export default PostGallery