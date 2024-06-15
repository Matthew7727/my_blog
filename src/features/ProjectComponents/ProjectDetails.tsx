import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Container, Chip, Link } from '@mui/material';
import axios from 'axios';
import { Project } from '../../views/Projects';

function ProjectDetails() {
  const location = useLocation();
  const project = (location.state as { project: Project }).project;

  const [commitHistory, setCommitHistory] = useState<string[]>([]);
  const [repoCreationDate, setRepoCreationDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommitHistory = async () => {
      if (project?.githubUrl) {
        const repo = project.githubUrl.replace('https://github.com/', '');
        const response = await axios.get(`https://api.github.com/repos/${repo}/commits`);
        setCommitHistory(response.data.map((commit: { commit: { message: string } }) => commit.commit.message));
      }
    };

    const fetchRepoDetails = async () => {
      if (project?.githubUrl) {
        const repo = project.githubUrl.replace('https://github.com/', '');
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        setRepoCreationDate(response.data.created_at);
      }
    };

    fetchCommitHistory();
    fetchRepoDetails();
  }, [project]);

  const calculateDuration = (startDate: string): number => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  const calculateRepoDuration = (repoCreationDate: string): number => {
    if (!repoCreationDate) return 0;
    return calculateDuration(repoCreationDate);
  };

  if (!project) {
    return (
      <Container>
        <Typography variant="h6" component="div">Project not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="div" sx={{ marginBottom: 4, textAlign: 'center' }}>
        {project.title}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>{project.description}</Typography>
      {project.githubUrl && repoCreationDate && (
        <Typography variant="body2" color="text.secondary">Duration: {calculateRepoDuration(repoCreationDate)} months</Typography>
      )}
      <Box sx={{ marginY: 2 }}>
        {project.techStack.map((tech: string, index: number) => (
          <Chip key={index} label={tech} sx={{ margin: 0.5 }} />
        ))}
      </Box>
      {project.type === 'Personal' && project.githubUrl && (
        <>
          <Typography variant="body2" color="text.secondary">
            <Link href={project.githubUrl} target="_blank" rel="noopener">View Source Code</Link>
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>Commit History:</Typography>
          <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
            {commitHistory.map((commit: string, index: number) => (
              <Typography key={index} variant="body2" sx={{ marginY: 0.5 }}>{commit}</Typography>
            ))}
          </Box>
        </>
      )}
    </Container>
  );
}

export default ProjectDetails;