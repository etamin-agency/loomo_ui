import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter(tag => tag !== tagToDelete));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTag();
    }
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Add Tags here"
          variant="outlined"
          size="small"
          width="300px"
          value={newTag}
          onChange={(event) => setNewTag(event.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
        />
        <IconButton
          color="primary"
          onClick={handleAddTag}
          style={{ marginLeft: 4, padding: 8 }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        width="230px" // Fixed width for the tags container
        
        borderRadius="4px"
      >
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDeleteTag(tag)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TagsInput;
