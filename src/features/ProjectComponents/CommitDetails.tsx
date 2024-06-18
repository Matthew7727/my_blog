import { Box, Stack, Typography } from '@mui/material';
import { GitHubCommit } from './githubAPI'; // Adjust the import path as needed

interface CommitDetailsProps {
    commit: GitHubCommit;
}

function CommitDetails({ commit }: CommitDetailsProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    return (
        <Box key={commit.sha} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
            <Stack direction={'row'} spacing={1} alignItems={'flex-start'} justifyContent={'space-between'}>
                <Typography variant="body2" sx={{ fontFamily: 'inter', fontWeight: 'bold', flexGrow: 1, flexShrink: 1, flexBasis: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {commit.commit.message}
                </Typography>
                <Typography variant="caption" sx={{ flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '150px' }}>
                    {commit.sha}
                </Typography>
            </Stack>
            <Typography variant='body2' sx={{ fontFamily: 'inter' }}>{formatDate(commit.commit.author.date)}</Typography>
            <Typography variant="body2">
                <span style={{ color: 'green' }}>+{commit.files?.reduce((sum, file) => sum + file.additions, 0) || 0}</span>
                <span style={{ color: 'red' }}> -{commit.files?.reduce((sum, file) => sum + file.deletions, 0) || 0}</span>
            </Typography>
        </Box>
    );
}

export default CommitDetails;