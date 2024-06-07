import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const pages = [
  { name: 'About', path: 'about' },
  { name: 'Entries', path: 'entries' },
  { name: 'My Experience', path: 'my-experience' },
  { name: 'Projects', path: 'projects' },
  { name: 'Random Tools', path: 'random-tools' },
  { name: 'Daily Coding Challenges', path: 'daily-coding-challenges' }
];

function MyHeader() {
  return (
    <AppBar position='fixed' sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6' noWrap sx={{ fontFamily: 'inter', color: 'black', fontWeight: 'bold' }} className='header-main-text'>
            Matthew Eccleston
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              key={page.path}
              component={Link}
              to={`/${page.path}`}
              sx={{ fontFamily: 'inter', color: 'black' }}
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