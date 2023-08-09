import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setTaskInput(tasks[index]);
  };

  const handleUpdateTask = () => {
    if (taskInput.trim() !== '') {
      const newTasks = [...tasks];
      newTasks[editingIndex] = taskInput;
      setTasks(newTasks);
      setTaskInput('');
      setEditingIndex(-1);
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '1rem' }}>
        <Typography variant="h4" gutterBottom>
          ToDo List
        </Typography>
        <TextField
          label="Add Task"
          variant="outlined"
          fullWidth
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (editingIndex === -1 ? handleAddTask() : handleUpdateTask())}
        />
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index}>
              {editingIndex === index ? (
                <>
                  <TextField
                    fullWidth
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateTask()}
                  />
                  <IconButton edge="end" onClick={handleUpdateTask}>
                    <CheckIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <ListItemText primary={task} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleEditTask(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteTask(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ToDoList;
