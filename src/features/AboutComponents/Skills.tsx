import { Stack } from "@mui/material";
import { doc, collection, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import SkillsList from "./SkillsList";

function Skills() {

    const [proSkills, setProSkills] = useState<string[]>([])
    const [softSkills, setSoftSkills] = useState<string[]>([])



    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(collection(db, 'aboutMe'), 'SkillsAnExpertise');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setProSkills(data.skills.Professional);
                setSoftSkills(data.skills.Soft);
            } else {
                console.log('No such document');
            }
        }
        fetchData()
    }, [])


    return (
        <Stack direction='row' justifyContent='center' alignItems='flex-start' spacing={5} sx={{ paddingLeft: '150px', paddingRight: '150px' }}>
            <SkillsList skills={proSkills} title="Professional" />
            <SkillsList skills={softSkills} title="Soft" />
        </Stack>
    )
}

export default Skills