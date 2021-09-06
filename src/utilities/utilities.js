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

function returnTime(rentalTime) {
    const time = rentalTime.split(':');
    const moreTime = parseInt(time[1]) + 1;
    const returnTime = `${time[0]}:${moreTime}:${time[2]}`
    return returnTime;
}

function rentedTime(rentalDate, rentalTime) {
    const date = new Date();
    const now = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
    const time = new Date(`${rentalDate}T${rentalTime}`);
    const diff = Math.abs(now.getTime() - time.getTime());
    const lagTime = Math.ceil(diff / (1000));
    return lagTime;
}

function calculateValue(rents, lagTime) {
    let value=0;
    for(let i = 0; i<rents.length; i++) {
        for(let j = 0; j<rents[i].length; j++) {
            value += rents[i][j].rentValue;
        }
    }
    if(lagTime <= 60) {
        return value;

    } else {
        const percentage = value * 0.10;
        const totalValue = (Math.floor((lagTime - 60) / 10)) * percentage + value;
        return parseFloat(totalValue.toFixed(2));
    }
}

module.exports = {
    date,
    time,
    returnTime,
    rentedTime,
    calculateValue
}