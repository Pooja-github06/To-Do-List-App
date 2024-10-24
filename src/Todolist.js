// src/TodoList.js
import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addOrUpdateTodo = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        // Update existing todo
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? { ...todo, text: inputValue } : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null); // Reset edit index after update
      } else {
        // Add new todo
        setTodos([...todos, { text: inputValue, completed: false }]);
      }
      setInputValue(''); // Clear input
    }
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const startEdit = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add or edit a task"
      />
      <button onClick={addOrUpdateTodo}>
        {editIndex !== null ? 'Update' : 'Add'}
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span
              onClick={() => toggleTodo(index)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => startEdit(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
