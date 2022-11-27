import React from 'react'
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <header>
       <Typography className='text-center font-bold' variant="h5" gutterBottom>
         TodoList React
      </Typography>
    </header>
  )
}

export default Header