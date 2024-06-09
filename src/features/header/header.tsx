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
        <Typography
            variant='h5'
            noWrap
            component={Link}
            to="/"
            sx={{ 
              fontFamily: 'inter', 
              color: 'black', 
              fontWeight: 'bold', 
              textDecoration: 'none'  // To remove the underline from the link
            }}
            className='header-main-text'
          >
            Matthew Eccleston
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              key={page.path}
              component={Link}
              to={`/${page.path}`}
              sx={{ fontFamily: 'inter', color: 'black', fontSize:'12px' }}
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