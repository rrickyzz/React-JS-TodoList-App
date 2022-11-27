import React, { useEffect, useState } from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';

function Tasks({todo,removeTask,setCompleted,editTask}) {


  const handleChange = () => {

     setCompleted(todo.id)

  };






    
  return (
    
    <div>
      
           <ListItemButton >
           <Checkbox onChange={handleChange} checked={todo.completed?true:false} />
          <ListItemText  className={todo.completed?'line-through':''} >
            {todo.task} 
          </ListItemText>
          <ModeEditRoundedIcon sx={{ mr: 2.5 }} onClick={()=>editTask(todo.id,todo.task)}/>
          <ClearRoundedIcon  onClick={()=>removeTask(todo.id)} />
           </ListItemButton>
        
      
  
            

    </div>
      
  )
}

export default Tasks