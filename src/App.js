import './App.css';
import TaskItem from './Components/TaskItem'
import Paper from '@mui/material/Paper';
import Form from './Components/Form';
import {useState,useEffect} from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ConfettiEffect from './Effects/ConfettiEffect';
import { MyThemeContext } from '../src/Helper/Context';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const LOCAL_STORAGE_KEY='boss-ricky-todo-list-key';
let allTaskCounter = 0;
let allActiveCounter = 0;
let allCompletedCounter=0;
let categorizedTodos = [];
let currentTask='';
let currentId =0;

function App() {
 
  
  const dummyData = [
    {
       id:12.69,
       task:'dummy 1',
       completed:false

    },
    {
      id:123.69,
      task:'dummy 2',
      completed:false

   },
   {
    id:124.45,
    task:'dummy 3',
    completed:false

 },
  ]

  if(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))===null){
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(dummyData));
  }
  
  const localStorageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  const [todos,setTodos] = useState(localStorageTodos);
  const [filter,setFilter] = useState('all')
  const [editTaskInput,setEditTaskInput] = useState('');
  


  useEffect(()=>{

    //re init all the counters 
    allTaskCounter = 0;
    allActiveCounter = 0;
    allCompletedCounter=0;
    const localStorageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(localStorageTodos){
      setTodos(localStorageTodos)
      todos.filter((todo)=>!todo.completed?allActiveCounter=allActiveCounter+1:allCompletedCounter=allCompletedCounter+1)
      //count all todo,active todos and completed todos
    }
  },[]);

  useEffect(()=>{
   localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos));
  },[todos]);
  
  
  function addTodo(newtodo){
      
      let todo = {id:Math.random()*100,task:newtodo,completed:false}
      let newSetOfTask = [todo,...todos]
      setTodos(newSetOfTask)
    
  }
  


  function setCompleted(id){
      let toggledTodo = todos.map((todo)=>{
        if(todo.id===id){
          todo.completed=!todo.completed
        }
        return todo;
      })
      
      setTodos(toggledTodo)
  }


  function editCurrentTask(id,oldTask){
       currentTask  = oldTask;
       currentId = id;
      handleOpenDialog()
  }

  function updateTask(){
    if(editTaskInput.length>0){
      const newlyUpdatedTask = todos.map((todo)=>{
           if(todo.id===currentId){
             todo.task = editTaskInput
           }
        return todo }
         )
         handleCloseDialog()
         setTodos(newlyUpdatedTask)
    }
  }



  const  removeTask = (id)=>
  {
    let filteredTodos = [...todos].filter((todo)=>
    todo.id!==id )
    setTodos(filteredTodos)

  }
  

   

  
   if(filter==='all')

   {
    categorizedTodos = todos;
    if(todos){

      if(categorizedTodos.length===todos.length){
        if(categorizedTodos.length===0&&todos.length===0)
        {
          allTaskCounter=0;
        }
        allTaskCounter = categorizedTodos.length
      }
    }
   }else if(filter==='active')
   {
    if(todos){

      categorizedTodos=todos.filter(todo=>!todo.completed);
      if(categorizedTodos.length===todos.length){
  
        if(categorizedTodos.length===0&&todos.length===0)
        {
          allTaskCounter=0;
        }
        allActiveCounter = categorizedTodos.length
      }
    }
   }else if(filter==='completed')
   if(todos){

     
      categorizedTodos=todos.filter(todo=>todo.completed);
      if(categorizedTodos.length===todos.length){
        allCompletedCounter = categorizedTodos.length
      }
     }
     
    // dialog for edit todo

  const [dialog, setDialog] = useState(false);
  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleCloseDialog= () => {
     
    setDialog(false);
  };

  const handleEditTaskInput=(e)=>{

    setEditTaskInput(e.target.value)
  }

   
  
  return (
   
   
    <MyThemeContext.Provider value={{todos,setFilter,allTaskCounter,allActiveCounter,allCompletedCounter}}>

     
     

<div>
<Dialog  open={dialog} onClose={handleCloseDialog}>
  <DialogTitle  sx={{padding:5}}>Edit your task.</DialogTitle>
  <DialogContent sx={{padding:5}} >
    <TextField
      autoFocus
      margin="dense"
      id="name"
      placeholder={currentTask}
      fullWidth
      variant="standard"
      onChange={(e)=>handleEditTaskInput(e)}
    />
  </DialogContent>
  <DialogActions sx={{paddingRight:2.5,paddingBottom:2.5}}>
    <Button color='error' variant='contained' onClick={handleCloseDialog}>Cancel</Button>
    <Button color='success' variant='contained'  onClick={updateTask}>Save</Button>
  </DialogActions>
</Dialog>
</div>



    <div className="sm:pt-0 lg:pt-20 h-screen bg-amber-400">
      <div className='sm:mx-0 lg:mx-auto xl:mx-auto container sm:w-full md:mx-auto lg:w-1/2'>

      <Paper className='p-10' elevation={10} >
      <Header/>
      <Form addTodo={addTodo} />
      <div className='w-full'>
      
      {categorizedTodos.map((todo)=>{
        return <TaskItem todo={todo} removeTask={removeTask} key={todo.id} setCompleted={setCompleted} editTask={editCurrentTask} />
      })} 

        
      </div>
      {todos.length<=0?<ConfettiEffect/>:null}
      <Footer className='p-20'/>
      </Paper>
      </div>
        
    </div>
    </MyThemeContext.Provider>
  );
}

export default App;
