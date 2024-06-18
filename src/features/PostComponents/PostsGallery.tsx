import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PostCard from './PostCard'; // Adjust the import path as needed
import { fetchAllPosts, Posts } from './pstAPI';

function PostGallery() {
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await fetchAllPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PostGallery;