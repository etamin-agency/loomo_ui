import * as React from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

const DemoDay = () => {
    const [selectedDate, setSelectedDate] = React.useState(dayjs('2024-06-19'));
    const [selectedTime, setSelectedTime] = React.useState(dayjs('2024-06-19T17:00'));

    const datePickerStyles = {
      width: '150px', 
      
    };
    const timePickerStyles = {
      width: '110px', 
      
    };



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <DatePicker 
                        value={selectedDate}
                        onChange={(newDate) => setSelectedDate(newDate)}
                        format="DD/MM/YYYY"
                        slotProps={{ 
                            textField: { 
                                size: 'small', 
                                sx: datePickerStyles
                            } 
                        }}
                       
                    />
                    <TimePicker
                        value={selectedTime}
                        onChange={(newTime) => setSelectedTime(newTime)}
                        format="HH:mm"
                        slotProps={{ 
                            textField: { 
                              size: 'small', 
                              sx: timePickerStyles
                              
                            } 
                        }}
                    />
                </Box>
            </LocalizationProvider>
        </Box>
    );
}

export default DemoDay;