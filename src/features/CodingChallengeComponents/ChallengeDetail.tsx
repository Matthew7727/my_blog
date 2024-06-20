import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Editor from '@monaco-editor/react';

interface Challenge {
  number: number;
  dateCompleted: string;
  description: string;
  language: string;
  difficulty: string;
  solutionPath: string;
}

const GITHUB_RAW_BASE_URL = import.meta.env.VITE_GITHUB_RAW_URL;

function ChallengeDetail() {
  const location = useLocation();
  const challenge = location.state as Challenge;
  const [solutionContent, setSolutionContent] = useState<string>('');

  useEffect(() => {
    const fetchSolutionContent = async () => {
      const response = await axios.get(`${GITHUB_RAW_BASE_URL}${challenge.solutionPath}`);
      setSolutionContent(response.data);
    };

    fetchSolutionContent();
  }, [challenge.solutionPath]);

  const languageMapping: { [key: string]: string } = {
    python: 'python',
    java: 'java',
    go: 'go',
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontFamily: 'inter', fontWeight: 'bold', marginBottom: '8px' }}>
        Challenge {challenge.number}
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'inter' }}>
        Date Completed: {challenge.dateCompleted}
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'inter' }}>
        Language: {challenge.language}
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'inter' }}>
        Difficulty: {challenge.difficulty}
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: 'inter', marginTop: '16px' }}>
        Solution:
      </Typography>
      <Box sx={{ height: '300px', marginTop: '16px' }}>
        <Editor
          height="100%"
          defaultLanguage={languageMapping[challenge.language.toLowerCase()] || 'plaintext'}
          value={solutionContent}
          options={{
            readOnly: true,
            minimap: { enabled: false },
          }}
        />
      </Box>
    </Box>
  );
}

export default ChallengeDetail;