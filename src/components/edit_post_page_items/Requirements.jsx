import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

const Requirements = ({ requirements, setRequirements }) => {
  const inputRefs = useRef([]);
  const containerRef = useRef(null);

  const handleAddField = () => {
    if (requirements[requirements.length - 1]?.value.length >= 4) {
      const newField = { id: Date.now(), value: '', error: false };
      setRequirements([...requirements, newField]);

      // Focus on the new input field and scroll into view
      setTimeout(() => {
        inputRefs.current[requirements.length]?.focus();
        //inputRefs.current[requirements.length]?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } else {
      const newInputFields = requirements.map((field, index) => {
        if (index === requirements.length - 1) {
          return { ...field, error: true };
        }
        return field;
      });
      setRequirements(newInputFields);
    }
  };

  const handleRemoveField = (id) => {
    setRequirements(requirements.filter(field => field.id !== id));
  };

  const handleInputChange = (id, event) => {
    const newInputFields = requirements.map(field => {
      if (field.id === id) {
        return { ...field, value: event.target.value, error: event.target.value.length < 4 };
      }
      return field;
    });
    setRequirements(newInputFields);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddField();
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, requirements.length);
  }, [requirements]);

  return (
    <Box ref={containerRef} sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
      {requirements.map((field, index) => (
        <Box key={field.id} display="flex" alignItems="start" mb={1}>
          <TextField
            label="Write here course requirement"
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
            color={index === requirements.length - 1 ? "primary" : "secondary"}
            onClick={index === requirements.length - 1 ? handleAddField : () => handleRemoveField(field.id)}
            style={{ marginLeft: 4, padding: 8, marginTop: 10 }}
          >
            {index === requirements.length - 1 ? <AddIcon /> : <DeleteIcon color="primary" />}
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default Requirements;
