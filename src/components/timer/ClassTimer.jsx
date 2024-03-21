import {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import classService from "../../services/classService";
import {useNavigate} from "react-router-dom";

const ClassTimer = ({className,classDays, classTime, classId, teacherId}) => {
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    const {role} = useSelector(state => state.role);
    const [loading, setLoading] = useState(true);

    function calculateTimeRemaining() {
        if (!classDays) return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
        const endTime = new Date(classTime).getTime();
        const now = new Date();

        const currentTime = now.getTime();
        const userGMTOffsetInMilliseconds = now.getTimezoneOffset() * 60 * 1000;

        const adjustedEndTime = endTime - userGMTOffsetInMilliseconds;
        const timeDiff = adjustedEndTime - currentTime;



        const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let closestDay = 6;
        const day = now.getDay();
        for (let i = 0; i < classDays?.length; i++) {
            const num = daysInWeek.indexOf(classDays[i]) - day;
            if (num === 0 ) {
                if (isTimeGreaterThanNow(className,new Date(adjustedEndTime),now)){
                    console.log()
                    closestDay = 0;
                    break;
                }
            }
            if (num > 0 && num < closestDay) {
                closestDay = num;
                continue;
            }
            if (num < 0 && (6 + num) < closestDay) {
                if (adjustedEndTime > currentTime){
                    closestDay = 6 + num;
                }
            }
        }


        const daysRemaining = closestDay;
        const hoursRemaining = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesRemaining = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const secondsRemaining = Math.floor((timeDiff % (1000 * 60)) / 1000);

        if (secondsRemaining<0){
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }
        return {
            days: daysRemaining ,
            hours: hoursRemaining,
            minutes: minutesRemaining,
            seconds: secondsRemaining
        };
    }
    function isTimeGreaterThanNow(className,time1, time2) {
        const hours1 = time1.getHours();
        const minutes1 = time1.getMinutes();
        const seconds1 = time1.getSeconds();

        const hours2 = time2.getHours();
        const minutes2 = time2.getMinutes();
        const seconds2 = time2.getSeconds();
        console.log("className:"+className)
        console.log("now:")
        console.log(hours2)
        console.log(time2)
        console.log("class:")
        console.log(hours1)
        console.log(time1)
        return hours1 > hours2 ||
            (hours1 === hours2 && minutes1 > minutes2) ||
            (hours1 === hours2 && minutes1 === minutes2 && seconds1 > seconds2);
    }


    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);
        setLoading(false)
        return () => clearInterval(timerInterval);
    }, []);


    const teacherStudentText = () => {

    }
    return (
        <div className="timer-wrapper">
            {loading && <div className="Loading">
                <div>

                </div>
            </div>}
            {
                <div>{timeRemaining?.days} days {timeRemaining?.hours} hours {timeRemaining?.minutes} minutes {timeRemaining?.seconds} seconds
                    left to Class </div>
            }
        </div>
    );
};

export default ClassTimer;
