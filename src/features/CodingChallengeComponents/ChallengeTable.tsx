import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { fetchChallenges, Challenge } from './api';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 }, // Ensure 'id' is included if needed
  { field: 'number', headerName: 'Number', width: 150 },
  { field: 'dateCompleted', headerName: 'Date Completed', width: 150 },
  { field: 'language', headerName: 'Language', width: 150 },
  { field: 'difficulty', headerName: 'Difficulty', width: 150 },
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={challenges}
        columns={columns}
        onRowClick={handleRowClick}
        getRowId={(row) => row.id} // Ensure that each row is uniquely identified
      />
    </div>
  );
}

export default DailyCodingChallengesTable;