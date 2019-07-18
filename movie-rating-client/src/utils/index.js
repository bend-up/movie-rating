import dayjs from 'dayjs';

const dates = {
    getFormattedDate: value => dayjs(value).format('DD-MM-YYYY'),
}

Object.freeze(dates);

export {dates};