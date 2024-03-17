import { useState, useEffect } from 'react';
import {useSelector} from "react-redux";

const Timer = ({ demoTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    const {role} = useSelector(state => state.role);

    function calculateTimeRemaining() {
        const endTime = new Date(demoTime).getTime();
        const currentTime = new Date().getTime();
        const userGMTOffsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
        const adjustedEndTime = endTime - userGMTOffsetInMilliseconds; // Adjusted end time based on user's GMT offset
        const timeDiff = adjustedEndTime - currentTime;

        return {
            days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
        };
    }

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);
    const checkIsPositiveTime=()=>{
        if (timeRemaining.days<0||timeRemaining.hours<0||timeRemaining.minutes<0){
            return false;
        }
        return true;
    }
    const teacherStudentText=()=>{
        if (role === "teacher" ){
            if (timeRemaining.days>-8){
                return (<div className="accept-students">Please accept<br/> students to class</div>);
            }
            return (<div>Please delete <br/> or update a post</div>);
        }
        else {
            return (<div>Buy Course
                    <button className="btn btn-light btn-lg"></button>
            </div>);
        }
    }
    return (
        <div className="timer-wrapper">
            {checkIsPositiveTime()?
                (<div>{timeRemaining.days} days {timeRemaining.hours} hours {timeRemaining.minutes} minutes {timeRemaining.seconds} seconds left to demo </div>):
                teacherStudentText()
            }
        </div>
    );
};

export default Timer;
