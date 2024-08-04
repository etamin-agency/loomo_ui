import * as React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState } from "react";
import dayjs from "dayjs";
import './EditPageItems.scss';

const CourseDuration = ({ duration, setter }) => {

    const [startDate, setStartDate] = useState(duration?.startDate ? dayjs(duration.startDate) : null);
    const [endDate, setEndDate] = useState(duration?.endDate ? dayjs(duration.endDate) : null);

    const handleSetDateAndClose = (date, isStartDate = true) => {
        const dateObject = dayjs(date.toDate());

        if (isStartDate) {
            if (endDate && dateObject.isAfter(endDate)) {
                const newEndDate = dateObject.add(1, 'day');
                setter({ startDate: dateObject.toDate(), endDate: newEndDate.toDate() });
                setStartDate(dateObject);
                setEndDate(newEndDate);
            } else {
                setter({ ...duration, startDate: dateObject.toDate() });
                setStartDate(dateObject);
            }
        } else {
            setter({ ...duration, endDate: dateObject.toDate() });
            setEndDate(dateObject);
        }
    };

    return (
        <div className="CourseDuration">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                    <div className="duration-picker-wrapper">
                        <MobileDatePicker
                            value={startDate}
                            onChange={(date) => handleSetDateAndClose(date, true)}
                            disablePast
                            className="start-date-picker"
                            format="DD-MM-YYYY"
                        />
                        <div className="duration-picker-arrow">-{'>'}</div>
                        <MobileDatePicker
                            value={endDate}
                            onChange={(date) => handleSetDateAndClose(date, false)}
                            minDate={startDate ? dayjs(startDate).add(1, 'day') : null}
                            className="start-date-picker"
                            format="DD-MM-YYYY"
                        />
                    </div>
                </DemoItem>
            </LocalizationProvider>
        </div>
    );
};

export default CourseDuration;
