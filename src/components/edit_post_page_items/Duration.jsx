import React from 'react';
import { TextField, FormControl, InputLabel, InputAdornment, Grid, Box } from '@mui/material';

import "./EditPageItems.scss"


const DurationInput = () => {
  const [hours, setHours] = React.useState(1);
  const [minutes, setMinutes] = React.useState(1);

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  return (
    <div className='Duration'>
    <FormControl component="fieldset">
     
     <Box display="flex" rowGap={0} alignItems="center" gap={1}>
      
          <TextField
            type="number"
            value={hours}
            size='small'
            onChange={handleHoursChange}
            InputProps={{
              
              inputProps: { min: 0 },
            }}
            style={{ width: 70 }}
          />
       
        <p >Hours</p>
        
          <TextField
            type="number"
            value={minutes}
             size='small'
            onChange={handleMinutesChange}
            InputProps={{
              
              inputProps: { min: 0, max: 59 },
            }}
            style={{ width: 70 }}
          />
        
        <p>Minutes</p>
      </Box>
    </FormControl>
    </div>
  );
};

export default DurationInput;