import { useEffect, useState } from 'react';
import {  Typography, Container, List, ListItem, ListItemText } from '@mui/material';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export interface Project {
  id?: string;
  title: string;
  description: string;
  techStack: string[];
  startDate: string; // ISO string format
  type: 'Professional' | 'Personal';
  githubUrl?: string;
}

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const docRef = doc(collection(db, 'projects'), 'Projects');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as { professional: Omit<Project, 'id'>[]; personal: Omit<Project, 'id'>[] };
        const allProjects: Project[] = [
          ...data.professional.map((proj, index) => ({ ...proj, id: `professional-${index}` })),
          ...data.personal.map((proj, index) => ({ ...proj, id: `personal-${index}` }))
        ];
        setProjects(allProjects);
      } else {
        console.log('No such document');
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center', fontFamily:'inter', fontWeight:'bold' }}>
        My Projects
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            button
            onClick={() => navigate(`/projects/${project.id}`, { state: { project } })}
            sx={{ marginBottom: 2, border: '1px solid #ccc', borderRadius: 2 }}
          >
            <ListItemText primary={project.title} secondary={project.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Projects;