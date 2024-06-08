import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Box } from '@mui/material';

interface Submission {
  id: string;
  text: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  timestamp: unknown; // Firestore timestamp
}

const columns: GridColDef[] = [
  { field: 'text', headerName: 'Text', width: 300 },
  { field: 'ip', headerName: 'IP Address', width: 150 },
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'region', headerName: 'Region', width: 150 },
  { field: 'country', headerName: 'Country', width: 150 },
];

const QuestionResultsTable: React.FC = () => {
  const [rows, setRows] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'userSubmissions'));
      const submissions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Submission[];
      setRows(submissions);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSizeOptions={[5]} />
    </Box>
  );
};

export default QuestionResultsTable;