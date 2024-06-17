import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Avatar, Chip, Link } from '@mui/material';
import { fetchGitHubRepoDetails, fetchGitHubRepoCommits, fetchGitHubRepoLanguages, GitHubRepo, GitHubCommit } from './githubAPI'; // Adjust the import path as needed

function ProjectDetails() {
  const { repoName } = useParams<{ repoName: string }>();
  const [repoDetails, setRepoDetails] = useState<GitHubRepo | null>(null);
  const [repoLanguages, setRepoLanguages] = useState<string[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);

  useEffect(() => {
    const fetchRepoData = async () => {
      if (repoName) {
        const details = await fetchGitHubRepoDetails(`Matthew7727/${repoName}`);
        setRepoDetails(details);

        const languages = await fetchGitHubRepoLanguages(`Matthew7727/${repoName}`);
        setRepoLanguages(languages);

        const commitHistory = await fetchGitHubRepoCommits(`Matthew7727/${repoName}`);
        setCommits(commitHistory);
      }
    };

    fetchRepoData();
  }, [repoName]);

  if (!repoDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={repoDetails.owner.avatar_url} alt={repoDetails.owner.login} sx={{ width: 64, height: 64, marginRight: 2 }} />
        <Box>
          <Typography variant="h4" sx={{ fontFamily: 'inter', fontWeight: 'bold' }}>{repoDetails.name}</Typography>
          <Typography variant="subtitle1">{repoDetails.language}</Typography>
          <Typography variant="body2" color="text.secondary">Created on: {new Date(repoDetails.created_at).toLocaleDateString()}</Typography>
          <Typography variant="body2" color="text.secondary">Last commit on: {new Date(repoDetails.pushed_at).toLocaleDateString()}</Typography>
        </Box>
      </Box>
      <Typography variant="body1" mb={2}>{repoDetails.description}</Typography>
      <Box mb={2}>
        {repoLanguages.map((language, index) => (
          <Chip key={index} label={language} sx={{ margin: 0.5 }} />
        ))}
      </Box>
      <Box mb={2}>
        <Link href={repoDetails.html_url} target="_blank" rel="noopener">View Source Code</Link>
      </Box>
      <Box mb={2}>
        <Link href="#" target="_blank" rel="noopener">Download File</Link>
      </Box>
      <Typography variant="h6" component="div" sx={{ fontFamily: 'inter', fontWeight: 'bold', marginBottom: 2 }}>
        To-Do List
      </Typography>
      {/* Replace this with your actual To-Do List component */}
      <Typography variant="body2" color="text.secondary">To-Do list placeholder</Typography>
      <Box display="flex" mt={4}>
        <Box flex={1} mr={2}>
          <Typography variant="h6" component="div" sx={{ fontFamily: 'inter', fontWeight: 'bold', marginBottom: 2 }}>
            Recent Commits
          </Typography>
          {commits.slice(0, 5).map((commit) => (
            <Box key={commit.sha} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
              <Typography variant="body2" sx={{ fontFamily: 'inter', fontWeight: 'bold' }}>Commit ID: {commit.sha}</Typography>
              <Typography variant="body2">{commit.commit.message}</Typography>
              <Typography variant="body2" color="text.secondary">
                <Link href={commit.author.html_url} target="_blank" rel="noopener">
                  <Avatar src={commit.author.avatar_url} alt={commit.author.login} sx={{ width: 24, height: 24, marginRight: 1 }} />
                  {commit.commit.author.name}
                </Link>
              </Typography>
              <Typography variant="body2">
                <span style={{ color: 'green' }}>+{commit.files?.reduce((sum, file) => sum + file.additions, 0) || 0}</span> 
                <span style={{ color: 'red' }}> -{commit.files?.reduce((sum, file) => sum + file.deletions, 0) || 0}</span>
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default ProjectDetails;