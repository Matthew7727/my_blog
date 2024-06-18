import { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Link } from '@mui/material';
import { fetchFirestoreProjects, FirestoreProject } from '../features/ProjectComponents/firestoreAPI';

function Projects() {
  const [projects, setProjects] = useState<FirestoreProject[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects: FirestoreProject[] = await fetchFirestoreProjects();
        setProjects(projects);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center' }}>
        My Projects
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem 
            key={project.repoName} 
            component={Link} 
            href={`/projects/${project.repoName}`} 
            sx={{ 
              marginBottom: 2, 
              border: '1px solid #ccc', 
              borderRadius: 2, 
              display: 'flex', 
              textDecoration: 'none' 
            }}
          >
            <ListItemAvatar>
              <Avatar src={project.imageUrl} alt={project.name} />
            </ListItemAvatar>
            <ListItemText 
              primary={project.name} 
              secondary={project.projectDescription && project.projectDescription.length > 100 ? `${project.projectDescription.slice(0, 100)}...` : project.projectDescription} 
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