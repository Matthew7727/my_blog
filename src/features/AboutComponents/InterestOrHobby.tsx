import { Box, Typography, Stack } from '@mui/material';
import { PersonalInterest } from './PersonalInterests'; 
import FirebaseImage from '../../genericComponents/FirebaseImage';

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
      {interest.image && <FirebaseImage imagePath={interest.image} imageHeight='250px' />}
      <Box>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {interest.name}
        </Typography>
        <Typography variant="body1">{interest.para}</Typography>
      </Box>
    </Stack>
  );
}

export default InterestOrHobby;
