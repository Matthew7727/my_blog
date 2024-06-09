import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { collection, getDocs, Timestamp, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Box, Typography } from '@mui/material';

interface Submission {
  id: string;
  text: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  timestamp: Date; // Use Date type here
}

const columns: GridColDef[] = [
  { field: 'text', headerName: 'Text', width: 300 },
  { field: 'ip', headerName: 'IP Address', width: 150 },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'region', headerName: 'Region', width: 150 },
  { field: 'country', headerName: 'Country', width: 150 },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    width: 500
  }
];

const QuestionResultsTable: React.FC = () => {
  const [rows, setRows] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'userSubmissions'));
      const submissions = querySnapshot.docs.map(doc => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          ...data,
          timestamp: (data.date as Timestamp).toDate() // Convert Firestore Timestamp to JavaScript Date
        };
      }) as Submission[];
      setRows(submissions);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant='h4' sx={{fontFamily: 'inter', fontWeight:'bold'}}>Other Users</Typography>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};

export default QuestionResultsTable;