import React, { useState, useEffect } from 'react';
import './style.css';
import TodoList from './Todolist';

export default function App() {
  const [inputtext, setInputtext] = useState('');
  const [task, setTask] = useState([]);
  const [edittext,setEdittext]=useState(null)

  const handleInput = (e) => {
    setInputtext(e.target.value);
    // console.log(inputtext)
  };
  const handleTask = () => {
    if (inputtext.trim()) {
      setTask([...task, { text: inputtext }]);
      setInputtext('');
    }
  };
  const handleDelete = (index) => {
   
   
      const newTodos = task.filter((_, i) => i !== index);
      setTask(newTodos)
    };
  
    const handleEdit=(index)=>{
    setInputtext(task[index].text)
    setEdittext(index)
    }

    const handleUpdateText =()=>{
      if (inputtext.trim()) {
        if (edittext !== null) {
          // Update existing todo
          const updatedTodos = task.map((item, index) =>
            index === edittext ? { ...item, text: inputtext } : item
          );
          setTask(updatedTodos);
          setEdittext(null); // Reset edit index after update
        } else {
          // Add new todo
          setTask([...task, { text: inputtext, completed: false }]);
        }
        setInputtext(''); // Clear input
      }
    }

  return (
    <div className="main-container">
      <h4>To Do List</h4>
      <div className="inputdiv">
        <input
          type="text"
          placeholder="Add new task..."
          value={inputtext}
          onChange={(e) => {
            handleInput(e);
          }}
        ></input>
        {edittext !== null ?<button onClick={() => handleUpdateText()}>Update</button> :<button onClick={() => handleTask()}>Add task</button>}
        
        <ul>
          {task.map((item, index) => (
            <div className="listCss">
              
              <li  key={index}>{item.text}</li>
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleEdit(index)}>Edit</button>
            </div>
            
          ))}
        </ul>
      </div>
      {/* <TodoList />{' '} */}
    </div>
  );
}
