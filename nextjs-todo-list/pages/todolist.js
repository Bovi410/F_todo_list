import { useState } from 'react';
import { Box, Paper, TextField, Checkbox, Typography, Button } from '@mui/material';

const TodoItem = ({ todo, checkTodo, deleteTodo }) => {
  const { id, text, completed } = todo;

  return (
    <Box display="flex" alignItems="center" marginY="8px">
      <Checkbox checked={completed} onChange={() => checkTodo(id)} />
      <Typography variant="body1" sx={{ flexGrow: 1, mr: '16px', textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </Typography>
      <Button variant="outlined" size="small" color="error" onClick={() => deleteTodo(id)}>
        Delete
      </Button>
    </Box>
  );
};

const TodoList = ({ todos, checkTodo, deleteTodo }) => (
  <Box>
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} checkTodo={checkTodo} deleteTodo={deleteTodo} />
    ))}
  </Box>
);

const TodoForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      alignItems="center"
      marginBottom="16px"
      sx={{ '& .MuiTextField-root': { flexGrow: 1, marginRight: '16px' } }}
    >
      <TextField value={text} onChange={(event) => setText(event.target.value)} label="Enter todo" variant="outlined" />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const handleCheckTodo = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <Box maxWidth="600px" margin="0 auto" padding="16px">
      <Typography variant="h3" align="center" gutterBottom>
        Todo List
      </Typography>
      <Paper elevation={0}/>
      <Paper component={TodoForm} onSubmit={handleAddTodo} marginBottom="16px" />
      <Paper component={TodoList} todos={todos} checkTodo={handleCheckTodo} deleteTodo={handleDeleteTodo} />
    </Box>
  );
};

export default TodoApp;