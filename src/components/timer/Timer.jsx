import { useState, useEffect } from 'react';

const Timer = ({ demoTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    function calculateTimeRemaining() {
        const endTime = new Date(demoTime).getTime();
        const currentTime = new Date().getTime();
        const timeDiff = endTime - currentTime;
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

    return (
        <div className="timer-wrapper">
            {timeRemaining.days} days {timeRemaining.hours} hours {timeRemaining.minutes} minutes {timeRemaining.seconds} seconds left to demo
        </div>
    );
};

export default Timer;
