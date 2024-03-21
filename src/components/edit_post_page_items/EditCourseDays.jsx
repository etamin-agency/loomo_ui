import './EditPageItems.scss';
import {useDispatch} from "react-redux";
import {DemoItem} from "@mui/x-date-pickers/internals/demo";
import {StaticDateTimePicker} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";

const EditCourseDays = ({close, setter,isEditClass,setIsChanged}) => {

    const dispatch = useDispatch();
    const [isCalendarPage, setCalendarPage] = useState(true);
    const [data, setData] = useState({});
    const [days, setDays] = useState([['Monday', false], ['Tuesday', false], ['Wednesday', false], ['Thursday', false], ['Friday', false], ['Saturday', false], ['Sunday', false]])
    const handleSetDate = (date) => {
        setData(date)
    };
    useEffect(() => {
    }, [])
    const handleAddDay = (day) => {
        days[day][1] = true;
        const newDay = [...days];
        setDays(newDay)

    };


    const handleDeleteDay = (day) => {
        days[day][1] = false;
        const newDay = [...days];
        setDays(newDay)
    };
    const handleSaveData = () => {
        const dateObject = data.toDate();
        const rawOffset = new Date().getTimezoneOffset();
        const timezoneOffset = -rawOffset / 60;

        const gmtOffset = timezoneOffset >= 0 ? `+${timezoneOffset}` : `${timezoneOffset}`;
        const plainDateObject = {
            year: dateObject.getFullYear(),
            month: dateObject.getMonth()+1,
            day: dateObject.getDate(),
            hour: dateObject.getHours(),
            minute: dateObject.getMinutes(),
            gmt: gmtOffset,
            days:days.filter((day,i)=>days[i][1]==true).map(day=>day[0])
        };
        if (isEditClass){
            setter(plainDateObject)
            setIsChanged(true)
        }else {
            dispatch(setter(plainDateObject))
        }

        close()
    };

    return (
        <div className="some-name">
            <div className="EditCourseDays">
                {isCalendarPage ?
                    <DemoItem>
                        <StaticDateTimePicker
                            onAccept={handleSetDate}
                            onClose={() => setCalendarPage(false)}
                            disablePast
                        />
                    </DemoItem> :
                    (
                        <div>
                            <div className="selected-days">
                                {days.map((day, i) => {
                                    if (days[i][1]) {
                                        return (
                                            <div key={i} className="selected-day" onClick={() => handleDeleteDay(i)}>
                                                <div className="selected-day-text"> {day[0]}</div>
                                                <div className="btn-close" onClick={()=>handleDeleteDay(i)}></div>
                                            </div>
                                        )
                                    }

                                })}
                            </div>
                            <div className="days-wrapper">
                                {days.map((day, i) => (
                                    <div key={i} className={day[1] ? "day selected" : "day"}
                                         onClick={() => handleAddDay(i)}>
                                        <div> {day[0]}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="btn-wrapper">
                                <Button className="button-cancel" type="button" size="sm"  onClick={()=>close()}>
                                    Cancel
                                </Button>
                                <Button className="text-button" type="button" size="sm" onClick={handleSaveData}>
                                    Save
                                </Button>
                            </div>

                        </div>

                    )
                }

            </div>
        </div>
    )
}
export default EditCourseDays;