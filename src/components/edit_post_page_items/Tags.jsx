import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const MAX_TAGS = 8;
const MIN_TAG_LENGTH = 3;
const ERRORS = {
  maxTags: `You can only add up to ${MAX_TAGS} tags.`,
  shortTag: `Tag must be at least ${MIN_TAG_LENGTH} characters.`,
  uniqueTag: 'Tags must be unique.',
  emptyTag: 'Tag cannot be empty.',
};

const TagsInput = ({ tags = [], setTags }) => {
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState('');

  const safeTags = Array.isArray(tags) ? tags : [];

  const handleAddTag = () => {
    if (safeTags.length >= MAX_TAGS) {
      setError(ERRORS.maxTags);
      return;
    }
    if (newTag.trim().length < MIN_TAG_LENGTH) {
      setError(ERRORS.shortTag);
      return;
    }
    if (safeTags.includes(newTag.trim())) {
      setError(ERRORS.uniqueTag);
      return;
    }
    if (newTag.trim() === '') {
      setError(ERRORS.emptyTag);
      return;
    }
    setTags([...safeTags, newTag.trim()]);
    setNewTag('');
    setError('');
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(safeTags.filter(tag => tag !== tagToDelete));
    setError('');
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Add Tags"
          variant="outlined"
          size="small"
          value={newTag}
          onChange={(event) => setNewTag(event.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
          error={!!error}
          helperText={error}
          sx={{ mt: 1 }}
        />
        <IconButton
          color="primary"
          onClick={handleAddTag}
          sx={{ ml: 1, mt: 1 }}
          aria-label="add tag"
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          maxHeight: 100,
          overflowY: 'auto',
          mb: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          width: '230px',
          borderRadius: '4px',
        }}
      >
        {safeTags.slice(0, MAX_TAGS).map((tag, index) => (
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

TagsInput.propTypes = {
  tags: PropTypes.array,
  setTags: PropTypes.func.isRequired,
};

export default TagsInput;
