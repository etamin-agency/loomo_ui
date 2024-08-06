import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

const CourseForm = ({ courseToWho, setCourseToWho }) => {
  const inputRefs = useRef([]);

  const handleAddField = () => {
    if (courseToWho[courseToWho.length - 1]?.value.length >= 4) {
      const newField = { id: Date.now(), value: '', error: false };
      setCourseToWho([...courseToWho, newField]);

      // Focus on the new input field and scroll into view
      setTimeout(() => {
        inputRefs.current[courseToWho.length]?.focus();
        //inputRefs.current[courseToWho.length]?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } else {
      const newInputFields = courseToWho.map((field, index) => {
        if (index === courseToWho.length - 1) {
          return { ...field, error: true };
        }
        return field;
      });
      setCourseToWho(newInputFields);
    }
  };

  const handleRemoveField = (id) => {
    setCourseToWho(courseToWho.filter(field => field.id !== id));
  };

  const handleInputChange = (id, event) => {
    const newInputFields = courseToWho.map(field => {
      if (field.id === id) {
        return { ...field, value: event.target.value, error: event.target.value.length < 4 };
      }
      return field;
    });
    setCourseToWho(newInputFields);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddField();
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, courseToWho.length);
  }, [courseToWho]);

  return (
    <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
      {courseToWho.map((field, index) => (
        <Box key={field.id} display="flex" alignItems="start" mb={1}>
          <TextField
            label="Write here course to who?"
            variant="outlined"
            style={{ marginTop: 10 }}
            size="small"
            value={field.value}
            inputRef={el => inputRefs.current[index] = el}
            onChange={(event) => handleInputChange(field.id, event)}
            onKeyDown={handleKeyPress}
            fullWidth
            error={field.error}
            helperText={field.error ? "Must be at least 4 characters" : ""}
          />
          <IconButton
            color={index === courseToWho.length - 1 ? "primary" : "secondary"}
            onClick={index === courseToWho.length - 1 ? handleAddField : () => handleRemoveField(field.id)}
            style={{ marginLeft: 4, padding: 8, marginTop: 10 }}
          >
            {index === courseToWho.length - 1 ? <AddIcon /> : <DeleteIcon color="primary" />}
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default CourseForm;
