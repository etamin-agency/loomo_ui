import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

const Requirements = () => {
  const [inputFields, setInputFields] = useState([{ id: 1, value: '', error: false }]);

  const handleAddField = () => {
    if (inputFields[inputFields.length - 1].value.length >= 4) {
      setInputFields([...inputFields, { id: inputFields.length + 1, value: '', error: false }]);
    } else {
      const newInputFields = [...inputFields];
      newInputFields[inputFields.length - 1].error = true;
      setInputFields(newInputFields);
    }
  };

  const handleRemoveField = (id) => {
    setInputFields(inputFields.filter(field => field.id !== id));
  };

  const handleInputChange = (id, event) => {
    const newInputFields = inputFields.map(field => {
      if (field.id === id) {
        field.value = event.target.value;
        field.error = field.value.length < 4;
      }
      return field;
    });
    setInputFields(newInputFields);
  };

  return (
    <Box sx={{ maxHeight: 200, overflowY: 'auto', mb: 2 }}>
      {inputFields.map((field, index) => (
        <Box key={field.id} display="flex" alignItems="center" mb={1}>
          <TextField
            label="Write here course to who?"
            variant="outlined"
            size="small"
            value={field.value}
            onChange={(event) => handleInputChange(field.id, event)}
            fullWidth
            error={field.error}
            helperText={field.error ? "Must be at least 4 characters" : ""}
          />
          <IconButton
            color={index === inputFields.length - 1 ? "primary" : "secondary"}
            onClick={index === inputFields.length - 1 ? handleAddField : () => handleRemoveField(field.id)}
            style={{ marginLeft: 4, padding: 8 }}
          >
            {index === inputFields.length - 1 ? <AddIcon /> : <DeleteIcon color='primary'/>}
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default Requirements;
