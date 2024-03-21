function adjustDateByHour(year, month, day, hour, minute, hours) {
    const date = new Date(year, month - 1, day, hour, minute);
    const totalMillisecondsToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + totalMillisecondsToAdd);
    return date;
}

export function calculateTimeRemaining(classDays,classTime) {
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
            if (isTimeGreaterThanNow(new Date(adjustedEndTime),now)){
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
export function isTimeGreaterThanNow(time1, time2) {
    const hours1 = time1.getHours();
    const minutes1 = time1.getMinutes();
    const seconds1 = time1.getSeconds();
    const hours2 = time2.getHours();
    const minutes2 = time2.getMinutes();
    const seconds2 = time2.getSeconds();
    return hours1 > hours2 ||
        (hours1 === hours2 && minutes1 > minutes2) ||
        (hours1 === hours2 && minutes1 === minutes2 && seconds1 > seconds2);
}

export default adjustDateByHour;