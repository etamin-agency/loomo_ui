import React, { useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  IconButton,
  List,
  ListItem,
  Button,
  Modal,
  TextField,
  Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const RoadmapToggle = () => {
  const [open, setOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [inputFields, setInputFields] = useState([{ id: 1, value: '', error: false }]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const newLessons = inputFields.filter(field => field.value.trim() !== '' && !field.error).map(field => field.value);
    if (newLessons.length > 0) {
      setLessons([...lessons, ...newLessons]);
      setInputFields([{ id: 1, value: '', error: false }]);
      handleClose();
    }
  };

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

  const displayedLessons = showAll ? lessons : lessons.slice(0, 4);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddField();
    }
  };


  return (
    <Box sx={{ maxWidth: 400, margin: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Roadmap
        </Typography>
        <Switch 
          checked={isDisabled} 
          onChange={() => setIsDisabled(!isDisabled)} 
        />
        <IconButton onClick={handleOpen} disabled={isDisabled}>
          <EditIcon />
        </IconButton>
      </Box>
      {!isDisabled && (
        <>
          <Box sx={{ maxHeight: 200, maxWidth: 266, overflowY: 'auto', mb: 2 }}>
            <List>
              {displayedLessons.map((lesson, index) => (
                <ListItem key={index}>
                  <Typography>
                    Lesson {index + 1} - {lesson}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
          {lessons.length > 2 && !showAll && (
            <Button fullWidth variant="outlined" onClick={() => setShowAll(true)}>
              Show More
            </Button>
          )}
        </>
      )}
      <Modal open={open} onClose={handleClose}>
        <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add New Lesson
          </Typography>
          {inputFields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center" mb={1}>
              <TextField
                label="Lesson Title"
                variant="outlined"
                size="small"
                value={field.value}
                onChange={(event) => handleInputChange(field.id, event)}
                onKeyDown={handleKeyPress}
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
          <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        </Paper>
      </Modal>
    </Box>
  );
};

export default RoadmapToggle;
