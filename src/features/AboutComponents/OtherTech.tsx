import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebase/firebaseConfig";
import { Chip, Grid, Stack } from "@mui/material";

function OtherTech() {

    const [otherTechData, setOtherTechData] = useState<string[]>([]);

    useEffect(() => {
        const fetchOtherTechData = async () => {
            const docRef = doc(collection(db, 'aboutMe'), 'SkillsAnExpertise');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setOtherTechData(data.otherTech);
            } else {
                console.log('No such document');
            }
        }
        fetchOtherTechData()
    }, []);

    return (
        <Stack direction='row' spacing={5} justifyContent='center'>
            {otherTechData.map((tech, index) => (
                <Grid item xs={1} key={index} >
                    <Chip label={tech} sx={{fontSize:'15px', fontWeight:'bold'}} />
                </Grid>
            ))}
        </Stack>
    )
}

export default OtherTech