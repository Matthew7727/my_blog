import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import FirebaseImage from '../../genericComponents/FirebaseImage';
import { useEffect, useState } from 'react';
import { doc, collection, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
const pages = [
  { name: 'About', path: 'about' },
  { name: 'Projects', path: 'projects' },
  // { name: 'Random Tools', path: 'random-tools' },
  { name: 'Posts', path: 'entries' },
  { name: 'Daily Coding Challenges', path: 'daily-coding-challenges' }
];

function MyHeader() {

  const [logoUrl, setLogoUrl] = useState<string>('')

  useEffect(() => {
    const fetchProjects = async () => {
      const docRef = doc(collection(db, 'generic'), 'Images');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data()
        setLogoUrl(data.logo as string) 
      }
    }
    fetchProjects()
  }, [])

  return (
    <AppBar position='fixed' sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Stack direction='row' spacing={1} justifyContent={'center'} alignItems={'center'}>
            <FirebaseImage imageHeight='45px' imagePath={logoUrl} />
            <Typography
              variant='h5'
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: 'inter',
                color: 'black',
                fontWeight: 'bold',
                textDecoration: 'none' 
              }}
              className='header-main-text'
            >
              Matthew Eccleston
            </Typography>

          </Stack>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={`/${page.path}`}
                sx={{ fontFamily: 'inter', color: 'black', fontSize: '12px' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MyHeader;