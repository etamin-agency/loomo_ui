import React, {useEffect} from 'react';
import {
    TextField,
    FormControl,
    OutlinedInput,
    Select,
    MenuItem,
    InputLabel,
    FormHelperText,
    Box,
    Typography
} from '@mui/material';

const Students = (props) => {
    const [students, setStudents] = React.useState();
    const [country, setCountry] = React.useState('');
    const [error, setError] = React.useState('');

    useEffect(() => {
        setStudents(props.numberOfStudents)
    }, [])

    const handleStudentChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (value < 0) {
            setError('Number of students must be a non-negative number');
        } else {
            setError('');
            setStudents(value);
            props.setNumberOfStudents(value)
        }
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    const names = [
        'United States',
        'United Kingdom',
        'Uzbekistan',
        'Canada',
        'Russian',
        'Australia',
        'Italy'
    ];

    return (
        <Box>
            <Box display="flex" alignItems="center" mt={1}>
                <TextField
                    value={students}
                    onChange={handleStudentChange}
                    type="number"
                    size="small"
                    placeholder="0"
                    error={!!error}
                    helperText={error}
                    InputProps={{
                        inputProps: {min: 0}
                    }}
                    style={{width: 100, marginRight: 10}}
                />
                <FormControl size="small" style={{minWidth: 120}} error={!!error}>
                    <InputLabel id="demo-multiple-checkbox-label" className="label">Country</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        value={country}
                        input={<OutlinedInput label="Country"/>}
                        onChange={handleCountryChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {names.map((name, index) => (
                            <MenuItem key={index} value={name}>{name}</MenuItem>
                        ))}

                    </Select>
                    <FormHelperText>{error}</FormHelperText>
                </FormControl>
            </Box>
        </Box>
    );
};

export default Students;
