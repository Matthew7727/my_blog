import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { Alert, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { getUserLocation } from "./userLocation";


function IntroQuestion() {

  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() === '') return

    const userLocation = await getUserLocation();

    if (userLocation.ip != '') {
      try {
        await addDoc(collection(db, 'userSubmissions'), {
          text: inputValue,
          ip: userLocation.ip,
          city: userLocation.city,
          region: userLocation.region,
          country: userLocation.country,
          date: new Date()
        });
        setInputValue('');
        setIsSubmitted(true);
        setSnackbarMessage('THANKS');
        setSnackbarSeverity('success');
      } catch (error) {
        console.error("Error adding document: ", error);
        setSnackbarMessage('Oh no that failed. Please try again.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    }
  };
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
      <Typography variant='h6' noWrap sx={{ fontFamily: 'inter', color: 'black', fontWeight: 'bold' }}>
        Hello there....
      </Typography>
      <Typography variant="subtitle2" noWrap sx={{ fontFamily: 'inter', fontWeight: 'bold', color: 'gray', marginBottom: '16px' }}>
        What's brought you here today?
      </Typography>
      <Stack direction={"row"} spacing={1}>
      <TextField
      variant="standard"
      value={inputValue}
      onChange={handleInputChange}
      sx={{
        width: '100%',
        '& .MuiInput-underline:before': {
          borderBottomColor: 'black', 
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'black', 
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
          borderBottomColor: 'black', 
        },
      }}
    />
        <Button onClick={handleSubmit} sx={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }} disabled={isSubmitted}>
          Enter
        </Button>
      </Stack>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default IntroQuestion