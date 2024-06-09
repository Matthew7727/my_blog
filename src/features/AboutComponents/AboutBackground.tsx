import { Stack, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import FirebaseImage from "../../genericComponents/FirebaseImage";

interface BackgroundInfo {
    image: string,
    paragraph1: string
    paragraph2: string,
}

function AboutBackground() {

    const [backgroundData, setBackgroundData] = useState<BackgroundInfo>({image:'', paragraph1: '', paragraph2: ''});

    useEffect(() => {
        const fetchBackgroundInfo = async () => {
          const docRef = doc(db, 'aboutMe', 'Background');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as BackgroundInfo;
            setBackgroundData(data);
          } else {
            console.log("No such document!");
          }
        };
    
        fetchBackgroundInfo();
      }, []);
    
      if (!backgroundData) {
        return <div>Loading...</div>;
      }
    

    return (
        <Stack direction='row' spacing={5} sx={{ paddingLeft: '150px', paddingRight: '150px' }}>
        <FirebaseImage imagePath={backgroundData.image} imageHeight="400px"/>
        <Stack direction='column' alignItems='center' justifyContent='center'>
            <Typography variant="body1" paragraph sx={{ fontFamily: 'inter' }}>
                {backgroundData.paragraph1}
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontFamily: 'inter' }}>
                {backgroundData.paragraph2}
            </Typography>
        </Stack>
    </Stack>
    )
}

export default AboutBackground