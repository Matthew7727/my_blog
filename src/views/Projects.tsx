import { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Link } from '@mui/material';
import { fetchGitHubRepos, GitHubRepo } from '../features/ProjectComponents/githubAPI';

function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos: GitHubRepo[] = await fetchGitHubRepos('Matthew7727'); // Replace with your GitHub username
        setRepos(repos);
      } catch (error) {
        console.error('Failed to fetch repos', error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center' }}>
        My Projects
      </Typography>
      <List>
        {repos.map((repo) => (
          <ListItem 
            key={repo.name} 
            component={Link} 
            href={`/projects/${repo.name}`} 
            sx={{ 
              marginBottom: 2, 
              border: '1px solid #ccc', 
              borderRadius: 2, 
              display: 'flex', 
              textDecoration: 'none' 
            }}
          >
            <ListItemAvatar>
              <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} />
            </ListItemAvatar>
            <ListItemText 
              primary={repo.name} 
              secondary={repo.description && repo.description.length > 100 ? `${repo.description.slice(0, 100)}...` : repo.description} 
              primaryTypographyProps={{ style: { fontFamily: 'inter', fontWeight: 'bold' }}}
              secondaryTypographyProps={{ noWrap: true }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Projects;