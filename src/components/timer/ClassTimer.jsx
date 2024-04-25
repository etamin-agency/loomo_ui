import {useState, useEffect} from 'react';
import {calculateTimeRemaining} from "../../utils/helper/math";

const ClassTimer = ({classDays, classTime}) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(classDays,classTime));
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(classDays,classTime));
        }, 1000);
        setLoading(false)
        return () => clearInterval(timerInterval);
    }, []);


    return (
        <div className="timer-wrapper">
            {loading && <div className="Loading">
                <div>

                </div>
            </div>}
            {
                timeRemaining?.hours===-1?<div>Class is Closed</div>:
                <div>{timeRemaining?.days} days {timeRemaining?.hours} hours {timeRemaining?.minutes} minutes {timeRemaining?.seconds} seconds
                    left to Class </div>
            }
        </div>
    );
};

export default ClassTimer;
