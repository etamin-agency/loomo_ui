function adjustDateByHour(year, month, day, hour, minute, hours) {
    const date = new Date(year, month - 1, day, hour, minute);
    const totalMillisecondsToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + totalMillisecondsToAdd);
    return date;
}


export default adjustDateByHour;