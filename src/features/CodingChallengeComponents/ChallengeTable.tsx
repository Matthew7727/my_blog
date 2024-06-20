import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { fetchChallenges, Challenge } from './api';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
  { field: 'number', headerName: 'Number', width: 150, headerAlign: 'center' },
  { field: 'dateCompleted', headerName: 'Date Completed', width: 150, headerAlign: 'center' },
  { field: 'language', headerName: 'Language', width: 150, headerAlign: 'center' },
  { field: 'difficulty', headerName: 'Difficulty', width: 150, headerAlign: 'center' },
];

function DailyCodingChallengesTable() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChallenges();
      setChallenges(data);
    };

    fetchData();
  }, []);

  const handleRowClick = (params: GridRowParams) => {
    const row = params.row as Challenge;
    navigate(`/daily-coding-challenges/${row.number}`, { state: row });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Box sx={{ height: 500, width: '625px' }}>
        <DataGrid
          rows={challenges}
          columns={columns}
          onRowClick={handleRowClick}
          getRowId={(row) => row.id}
          sx={{
            border: '1px solid black',
            borderRadius: '0px',
            '& .MuiDataGrid-cell': {
              fontFamily: 'Inter, sans-serif',
              textAlign: 'center',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              textAlign: 'center',
              width: '100%',
            },
            '& .MuiDataGrid-columnHeader': {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default DailyCodingChallengesTable;