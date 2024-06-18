import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid } from '@mui/material';
import { fetchGitHubRepoDetails, fetchGitHubRepoCommits, fetchGitHubRepoLanguages, GitHubRepo, GitHubCommit } from './githubAPI'; // Adjust the import path as needed
import ProjectDetails from './ProjectDetails';
import CommitDetails from './CommitDetails';
import { fetchFirestoreProjectDetails, FirestoreProject } from './firestoreAPI';

function ProjectOverview() {
  const { repoName } = useParams<{ repoName: string }>();
  const [repoDetails, setRepoDetails] = useState<GitHubRepo>();
  const [repoLanguages, setRepoLanguages] = useState<string[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [firestoreProject, setFirestoreProject] = useState<FirestoreProject | null>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      if (repoName) {
        const details = await fetchGitHubRepoDetails(`Matthew7727/${repoName}`);
        setRepoDetails(details);

        const languages = await fetchGitHubRepoLanguages(`Matthew7727/${repoName}`);
        setRepoLanguages(languages);

        const commitHistory = await fetchGitHubRepoCommits(`Matthew7727/${repoName}`);
        setCommits(commitHistory);

        const firestoreDetails = await fetchFirestoreProjectDetails(repoName);
        setFirestoreProject(firestoreDetails);
      }
    };

    fetchRepoData();
  }, [repoName]);

  if (!repoDetails || !firestoreProject) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} md={7}>
          <ProjectDetails repoDetails={repoDetails} repoLanguages={repoLanguages} firestoreProject={firestoreProject} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontFamily: 'inter', fontWeight: 'bold', marginBottom: 2 }}>
              Recent Commits
            </Typography>
            {commits.slice(0, 5).map((commit) => (
              <CommitDetails key={commit.sha} commit={commit} />
            ))}
          </Box>
        </Grid>
      </Grid>
      <Box mt={1}>
        <Typography variant="h6" component="div" sx={{ fontFamily: 'inter', fontWeight: 'bold', marginBottom: 2 }}>
          To-Do List
        </Typography>
        {firestoreProject.toDos.map((todo, index) => (
          <Box key={index} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
            <Typography variant="body2" sx={{ fontFamily: 'inter', fontWeight: 'bold' }}>{todo.title} (Priority: {todo.priority})</Typography>
            <Typography variant="body2">{todo.description}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default ProjectOverview;