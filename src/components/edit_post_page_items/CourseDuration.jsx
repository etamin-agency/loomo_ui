import * as React from 'react';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers-pro';
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import './EditPageItems.scss'
import {useState} from "react";
import {StaticDateTimePicker} from "@mui/x-date-pickers";

const CourseDuration = (props) => {
    const [value, setValue] = useState()
    const handleSetDateAndClose = (date) => {
        const dateObject = date.toDate();
    }
    return (
        <div className="CourseDuration">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem >
                    <div className="duration-picker-wrapper">
                        <MobileDatePicker defaultValue={props?.startDate}
                                          onAccept={handleSetDateAndClose}
                                          disablePast
                                          className="start-date-picker"
                                          format="DD-MM-YYYY"
                                          style={{ height: '45px', fontSize: '10px' }}
                        />
                        <div>-></div>
                        <MobileDatePicker defaultValue={props?.startDate}
                                          onAccept={handleSetDateAndClose}
                                          disablePast
                                          className="start-date-picker"
                                          format="DD-MM-YYYY"
                                          style={{ height: '45px', fontSize: '10px' }}
                        />
                    </div>
                </DemoItem>
            </LocalizationProvider>
        </div>
    )

}
export default CourseDuration;