import React, {useEffect} from 'react';
import {TextField, FormControl, InputLabel, InputAdornment, Grid, Box} from '@mui/material';

import "./EditPageItems.scss"


const DurationInput = (props) => {
    const [hours, setHours] = React.useState(1);
    const [minutes, setMinutes] = React.useState(1);

    useEffect(() => {
        setHours(Math.floor(props.duration / 60));
        setMinutes(props.duration % 60)
    }, [])
    const handleHoursChange = (event) => {
        setHours(event.target.value);
        props.setDuration(minutes + hours * 60)
    };

    const handleMinutesChange = (event) => {
        setMinutes(event.target.value);
        props.setDuration(minutes + hours * 60)
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

                            inputProps: {min: 0},
                        }}
                        style={{width: 70}}
                    />

                    <p>Hours</p>

                    <TextField
                        type="number"
                        value={minutes}
                        size='small'
                        onChange={handleMinutesChange}
                        InputProps={{

                            inputProps: {min: 0, max: 59},
                        }}
                        style={{width: 70}}
                    />

                    <p>Minutes</p>
                </Box>
            </FormControl>
        </div>
    );
};

export default DurationInput;