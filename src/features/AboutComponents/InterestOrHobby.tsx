import { Box, Typography, Stack } from '@mui/material';
import { PersonalInterest } from './PersonalInterests'; 

interface InterestOrHobbyProps {
  interest: PersonalInterest;
  reverse: boolean;
}

function InterestOrHobby({ interest, reverse }: InterestOrHobbyProps) {
  return (
    <Stack
      direction={reverse ? 'row-reverse' : 'row'}
      spacing={2}
      sx={{ alignItems: 'center', marginBottom: 4 }}
    >
      
      <Box>
        <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {interest.name}
        </Typography>
        <Typography variant="body1">{interest.para}</Typography>
      </Box>
    </Stack>
  );
}

export default InterestOrHobby;
