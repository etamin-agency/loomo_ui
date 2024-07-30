import * as React from 'react';
import {DemoItem} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import {useState} from "react";

import './EditPageItems.scss'

const CourseDuration = ({duration,setter}) => {
    const handleSetDateAndClose = (date,isStartDate=true) => {
        const dateObject = date.toDate();
        if (isStartDate){
            setter({...duration,startDate:dateObject})
        }else {
            setter({...duration,endDate:dateObject})
        }
    }
    return (
        <div className="CourseDuration">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem >
                    <div className="duration-picker-wrapper">
                        <MobileDatePicker defaultValue={duration?.startDate}
                                          onAccept={handleSetDateAndClose}
                                          disablePast
                                          className="start-date-picker"
                                          format="DD-MM-YYYY"
                        />
                        <div className="duration-picker-arrow">-{'>'}</div>
                        <MobileDatePicker defaultValue={duration?.endDate}
                                          onAccept={(date)=>handleSetDateAndClose(date,false)}
                                          disablePast
                                          className="start-date-picker"
                                          format="DD-MM-YYYY"
                        />
                    </div>
                </DemoItem>
            </LocalizationProvider>
        </div>
    )

}
export default CourseDuration;