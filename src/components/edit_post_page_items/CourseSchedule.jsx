import {DemoItem} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider, MobileTimePicker, StaticTimePicker, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import './EditPageItems.scss'
import arrow_down from "../../assets/down-arrow-svgrepo-com.svg";
import Dropdown from "react-bootstrap/Dropdown";

const CourseSchedule = ({days, setDays, classTime, setClassTime}) => {

    const handleSetClassTime = (value) => {
        console.log(value)
    }

    return (
        <div className="CourseSchedule">
            <div className="schedule-block">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                        <TimePicker
                            label="Class Time"
                            className="schedule-time-picker"
                        />
                    </DemoItem>
                </LocalizationProvider>
            </div>
            <div className="schedule-block">
                <MultipleSelectCheckmarks/>
            </div>
        </div>
    )
}
function MultipleSelectCheckmarks() {
    const [personName, setPersonName] = React.useState([]);
    const ITEM_HEIGHT = 42;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const names = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
    console.log(personName)
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div className="WeekDaysItem">
            <FormControl sx={{ m: 1, width: 115 }} className="custom-toggle">
                <InputLabel id="demo-multiple-checkbox-label" className="label">  Days</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="sass" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}  className="dropdown-menu">
                            <Checkbox checked={personName.indexOf(name) > -1}  />
                            <ListItemText primary={name}  />
                        </MenuItem>
                    ))}

                </Select>

            </FormControl>
        </div>
    );
}
export default CourseSchedule;