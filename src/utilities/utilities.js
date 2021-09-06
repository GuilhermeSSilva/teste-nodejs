function date() {
    let date = new Date();
    let formattedDate = new Date(date.valueOf() - date.getTimezoneOffset() * 60000).toISOString().split('T');
    return formattedDate[0];
}

function time() {
    let time = new Date();
    let formattedTime = new Date(time.valueOf() - time.getTimezoneOffset() * 60000).toISOString().split('T');
    return formattedTime[1];
}

// function returnTime() {
//     const now = new Date();
//     const rentalTime = new Date('2014-07-07');
//     console.log(Math.abs(now.getTime() - rentalTime.getTime()));
// }

function returnTime(rentalTime) {
    const time = rentalTime.split(':');
    const moreTime = parseInt(time[1]) + 1;
    const returnTime = `${time[0]}:${moreTime}:${time[2]}`
    return returnTime;
}

module.exports = {
    date,
    time,
    returnTime
}