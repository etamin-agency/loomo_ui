import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const TagsInput = ({ tags, setTags }) => {
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');

  const handleAddTag = () => {
    if (tags?.length >= 8) {
      setError('You can only add up to 8 tags.');
      return;
    }
    if (newTag.trim().length < 3) {
      setError('Tag must be at least 3 characters .');
      return;
    }
    if (newTag.trim() !== '' && !tags?.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      setError('');
    } else if (tags?.includes(newTag)) {
      setError('Tags must be unique.');
    } else {
      setError('Tag cannot be empty.');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
    setError(''); // Clear error message if any tag is deleted
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="start" mb={2}>
        <TextField
          label="Add Tags here"
          variant="outlined"
          size="small"
          value={newTag}
          style={{ marginTop: 10 }}
          onChange={(event) => setNewTag(event.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
          error={!!error}
          helperText={error}
        />
        <IconButton
          color="primary"
          onClick={handleAddTag}
          style={{ marginLeft: 4, padding: 8, marginTop: 8 }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{ maxHeight: 100, overflowY: 'auto', mb: 2 }}
        display="flex"
        flexWrap="wrap"
        gap={1}
        width="230px" // Fixed width for the tags container
        borderRadius="4px"
      >
        {tags?.slice(0, 8).map((tag, index) => (
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