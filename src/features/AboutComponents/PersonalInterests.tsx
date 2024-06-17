import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig'; 
import InterestOrHobby from './InterestOrHobby';

export interface PersonalInterest {
    name: string;
    para: string;
    image?: string;
}

function PersonalInterests() {
    const [hobbies, setHobbies] = useState<PersonalInterest[]>([]);
    const [interests, setInterests] = useState<PersonalInterest[]>([]);

    useEffect(() => {
        const fetchPersonalInterests = async () => {
            const docRef = doc(collection(db, 'aboutMe'), 'PersonalInterests');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setHobbies(data.hobbies);
                setInterests(data.interests);
            } else {
                console.log('No such document');
            }
        };
        fetchPersonalInterests();
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant='h5' noWrap sx={{ fontFamily: 'inter', color: 'black', paddingTop: '50px', fontWeight:'bold'}}>
                Personal Interests
            </Typography>
            <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                Hobbies:
            </Typography>
            <Stack spacing={4} sx={{ marginBottom: 6 }}>
                {hobbies.map((hobby, index) => (
                    <InterestOrHobby key={index} interest={hobby} reverse={index % 2 === 1} />
                ))}
            </Stack>

            <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
                Interests:
            </Typography>
            <Stack spacing={4}>
                {interests.map((interest, index) => (
                    <InterestOrHobby key={index} interest={interest} reverse={index % 2 === 1} />
                ))}
            </Stack>
        </Box>
    );
}

export default PersonalInterests;
