import * as React from 'react'
import { AppBar, Button, Container, Menu, MenuIcon, MenuItem, Toolbar, Typography } from '@mui/material'

const pages = ['About', 'Experience', 'Projects', 'Randon Tools', 'Daily Coding Challenges']



function MyHeader() {
  return (
    <AppBar position='static'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant='h6' noWrap className='header-text'>
            Matthew Eccleston
          </Typography>
          <Box>
            {pages.map((page) => {
              <Button key={page} onClick={} sx={{ my: 2, color: 'black', display: 'block' }}
              > {page} </Button>
            })}
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  )

}

export default MyHeader