import * as React from 'react';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

const DemoDay = ({ demoDate, setDemoDate }) => {
    const [selectedDate, setSelectedDate] = React.useState(demoDate ? dayjs(demoDate).startOf('day') : dayjs());
    const [selectedTime, setSelectedTime] = React.useState(demoDate ? dayjs(demoDate) : dayjs().set('hour', 17).set('minute', 0));

    const handleDateChange = (newDate) => {
        const newDateTime = dayjs(selectedTime).set({
            year: newDate.year(),
            month: newDate.month(),
            date: newDate.date(),
        });
        setSelectedDate(newDate);
        setSelectedTime(newDateTime);
        setDemoDate(newDateTime.toISOString()); // Or format as needed
    };

    const handleTimeChange = (newTime) => {
        const newDateTime = dayjs(selectedDate).set({
            hour: newTime.hour(),
            minute: newTime.minute(),
        });
        setSelectedTime(newTime);
        setDemoDate(newDateTime.toISOString()); // Or format as needed
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="DD/MM/YYYY"
                        slotProps={{
                            textField: {
                                size: 'small',
                                sx: { width: '150px' }
                            }
                        }}
                    />
                    <TimePicker
                        value={selectedTime}
                        onChange={handleTimeChange}
                        format="HH:mm"
                        slotProps={{
                            textField: {
                                size: 'small',
                                sx: { width: '110px' }
                            }
                        }}
                    />
                </Box>
            </LocalizationProvider>
        </Box>
    );
}

export default DemoDay;
