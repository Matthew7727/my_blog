import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Button } from "@mui/material";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import Work from "./Work";

export interface WorkExperience {
  jobTitle: string;
  jobType: string;
  current: boolean;
  company: string;
  department: string;
  duration: string;
  location: string;
  responsibilities: string[];
  skills: string[];
  technologies?: string[];
  logoUrl: string;
  colour: string;
}

interface Filter<T> {
  label: string;
  key: keyof T;
  value: T[keyof T];
}

const filters: Filter<WorkExperience>[] = [
  { label: 'Current Job', key: 'current', value: true },
  { label: 'Tech Job', key: 'jobType', value: 'Tech Job' },
  { label: 'Leadership', key: 'skills', value: 'Leadership' }
];

function WorkExperiences() {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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
  }, []);

  const toggleFilter = (filterLabel: string) => {
    setActiveFilters(prevFilters =>
      prevFilters.includes(filterLabel)
        ? prevFilters.filter(f => f !== filterLabel)
        : [...prevFilters, filterLabel]
    );
  };

  const filteredWorkExperiences = workExperiences.filter(work => {
    return activeFilters.every(filterLabel => {
      const filter = filters.find(f => f.label === filterLabel);
      if (filter) {
        if (Array.isArray(work[filter.key])) {
          return (work[filter.key] as string[]).includes(filter.value as string);
        }
        return work[filter.key] === filter.value;
      }
      return true;
    });
  });

  return (
    <>
      <Typography variant='h5' noWrap sx={{ fontFamily: 'inter', color: 'black', paddingTop: '50px' }}>
        Work Experiences
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {filters.map(filter => (
          <Button
            key={filter.label}
            onClick={() => toggleFilter(filter.label)}
            variant="contained"
            sx={{
              margin: 0.5,
              borderRadius: 0,
              backgroundColor: activeFilters.includes(filter.label) ? 'black' : 'white',
              color: activeFilters.includes(filter.label) ? 'white' : 'black',
              border: '1px solid black',
              '&:hover': {
                backgroundColor: activeFilters.includes(filter.label) ? 'black' : '#f5f5f5',
              }
            }}
          >
            {filter.label}
          </Button>
        ))}
      </Box>
      <Grid container spacing={2}>
        {filteredWorkExperiences.map((work, index) => (
          <Work work={work} key={index} />
        ))}
      </Grid>
    </>
  );
}

export default WorkExperiences;
