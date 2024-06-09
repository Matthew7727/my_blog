import { Grid, Typography } from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import Work from "./Work";

export interface WorkExperience {
    jobTitle: string,
    jobType: string,
    current: boolean,
    company: string,
    department: string,
    duration: string,
    location: string,
    responsibilities: string[],
    skills: string[],
    technologies?: string[],
    logoUrl: string,
}

function WorkExperiences() {

    const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([])

    useEffect(() => {
        const fetchWorkExperiences = async () => {
            const docRef = doc(collection(db, 'aboutMe'), 'WorkExperiences');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setWorkExperiences(data.jobs);
            } else {
                console.log('No such document');
            }
        }
        fetchWorkExperiences();
    }, [])

    return (
        <>
            <Typography variant='h5' noWrap sx={{ fontFamily: 'inter', color: 'black', paddingTop: '50px' }}>
                Work Experiences
            </Typography>
            <Grid container>
                {workExperiences.map((work, index) => (
                    <Work work={work} key={index} />
                ))}
            </Grid>
        </>
    )
}

export default WorkExperiences