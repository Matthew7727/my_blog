import { useEffect, useState } from 'react';
import { Grid, Paper, Box, Stack, Typography, LinearProgress } from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/firebaseConfig';
import FirebaseImage from '../../genericComponents/FirebaseImage';

interface Tech {
  expLevel: number;
  image: string;
  name: string;
}

function TechCards() {
  const [techData, setTechData] = useState<Tech[]>([]);

  useEffect(() => {
    const fetchTechData = async () => {
      const docRef = doc(collection(db, 'aboutMe'), 'SkillsAnExpertise');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTechData(data.knownTech);
      } else {
        console.log("No such document!");
      }
    };

    fetchTechData();
  }, []);

  return (
    <Grid container justifyContent='center'>
      {techData.map((tech, index) => (
        <Grid item xs={3} sx={{ padding: '10px' }} key={index}>
          <Paper variant="outlined" sx={{height:'250px'}}>
            <Box>
              <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={2}>
                <Typography variant="h6" noWrap sx={{ fontFamily: 'inter', paddingTop: '15px' }}>
                  {tech.name}
                </Typography>
                <FirebaseImage imagePath={tech.image} imageHeight='100px'/>
                  <Box sx={{ width: '75%' }}>
                    <Typography variant='body1' sx={{fontFamily: 'inter', fontWeight: 'bold' }}> XP: </Typography>
                    <LinearProgress color="success" variant="determinate" value={tech.expLevel * 10} />
                  </Box>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default TechCards;