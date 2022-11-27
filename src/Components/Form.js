import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Form({addTodo}) {
  
  const tf = useRef()
  const addBtnRef = useRef()
  const [input,setInput] = useState("");

  const handleSubmit = (e) =>{
          e.preventDefault()
          if(input!==''){
            addTodo(input)  
          }
          setInput('')
    }



 
    

    
  

 
  return (
   <div> 
     
   <form onSubmit={handleSubmit} ref={tf} >
   <TextField onChange={(e)=>setInput(e.target.value)}  className='w-3/4' id="standard-basic" placeholder='write your task here.' variant="outlined" value={input} />
           
           <Button className='w-1/4' color='primary' sx={{p:2}}  variant="contained" type='submit' ref={addBtnRef}      
               >Add Task</Button>
   </form>
       
    
    </div>

    
  )
}

export default Form