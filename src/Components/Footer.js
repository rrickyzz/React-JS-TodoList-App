import React,{useContext}from 'react'
import Button from '@mui/material/Button';
import {MyThemeContext} from '../Helper/Context'
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';


function Footer() {
 
  const {dark,setFilter,allTaskCounter,allActiveCounter,allCompletedCounter} = useContext(MyThemeContext)
  
  const handleShowAll=()=>{
   setFilter('all')
  
  }

  const showActive=()=>{
    setFilter('active')
  }

  const showCompleted=()=>{
    setFilter('completed')
  }


  return (
    <div className=''>
    
    <div> 
    <Stack spacing={3} direction="row">
        <Button className='w-1/4'  style={{
        backgroundColor: dark? "red":"white",
      
       }}
    onClick={handleShowAll}>All</Button>
      <Badge badgeContent={allTaskCounter} color="primary"></Badge>


        <Button   className='w-1/4' onClick={showActive} >Active</Button>
          <Badge badgeContent={allActiveCounter}  color="error"></Badge>
        <Button className='w-1/4'
        onClick={showCompleted} >Completed</Button>
         <Badge badgeContent={allCompletedCounter} color="success"></Badge>



      </Stack>


      
    </div>

    <div className='flex justify-end'>
    </div>
    </div>
  )
}

export default Footer