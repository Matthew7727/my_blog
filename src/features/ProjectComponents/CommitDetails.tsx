import { Box, Typography } from '@mui/material';
import { GitHubCommit } from './githubAPI'; // Adjust the import path as needed

interface CommitDetailsProps {
  commit: GitHubCommit;
}

function CommitDetails({ commit }: CommitDetailsProps) {
  return (
    <Box key={commit.sha} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
      <Typography variant="body2" sx={{ fontFamily: 'inter', fontWeight: 'bold' }}>{commit.commit.message}</Typography>
      <Typography variant="body2">{commit.sha}</Typography>
      <Typography variant="body2">
        <span style={{ color: 'green' }}>+{commit.files?.reduce((sum, file) => sum + file.additions, 0) || 0}</span> 
        <span style={{ color: 'red' }}> -{commit.files?.reduce((sum, file) => sum + file.deletions, 0) || 0}</span>
      </Typography>
    </Box>
  );
}

export default CommitDetails;