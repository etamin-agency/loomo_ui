import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticDateTimePicker } from "@mui/x-date-pickers";

import './EditPageItems.scss';
import {useDispatch} from "react-redux";

const EditDemoDate = ({ setter, close }) => {
    const dispatch = useDispatch();

    const handleSetDateAndClose = (date) => {
        const dateObject = date.toDate();
        const rawOffset = new Date().getTimezoneOffset();
        const timezoneOffset = -rawOffset / 60;

        const gmtOffset = timezoneOffset >= 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;
        const plainDateObject = {
            year: dateObject.getFullYear(),
            month: dateObject.getMonth(),
            day: dateObject.getDate(),
            hour: dateObject.getHours(),
            minute: dateObject.getMinutes(),
            gmt: gmtOffset
        };

        dispatch(setter(plainDateObject));
    };

    return (
        <div className="some-name">
            <div className="EditDemoDate">
                <DemoItem>
                    <StaticDateTimePicker
                        onAccept={handleSetDateAndClose}
                        onClose={close}
                    />
                </DemoItem>
            </div>
        </div>
    );
};

export default EditDemoDate;