import {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import classService from "../../services/classService";

const Timer = ({demoTime, classId}) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    const {role} = useSelector(state => state.role);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

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
    const checkIsPositiveTime = () => {
        if (timeRemaining.days < 0 || timeRemaining.hours < 0 || timeRemaining.minutes < 0) {
            teacherStudentText();
            return false;
        }
        return true;
    }
    const teacherStudentText = async () => {
        if (content) return;
        if (role === "teacher") {
            if (timeRemaining.days > -3) {
                setContent(<div className="accept-students">Please accept<br/> students to class</div>);
            } else {
                setContent(<div>Please delete <br/> or update a post</div>)
            }
            setLoading(false)
        } else {
            const isStudentAccepted = await classService.isStudentAccepted(classId);
            if (isStudentAccepted) {
                setContent(
                    <div className="buy-course">You are accepted <br/> to Course <br/>
                        <button className="buy-course-btn">Buy</button>
                    </div>);
                setLoading(false)
            } else {
                setContent(
                    <div>
                        You are not accepted yet
                    </div>
                )
                setLoading(false)
            }

        }
    }
    return (
        <div className="timer-wrapper">
            {loading && <div className="Loading">
                <div>

                </div>
            </div>}
            {checkIsPositiveTime() ?
                (
                    <div>{timeRemaining.days} days {timeRemaining.hours} hours {timeRemaining.minutes} minutes {timeRemaining.seconds} seconds
                        left to demo </div>) :
                content
            }
        </div>
    );
};

export default Timer;
