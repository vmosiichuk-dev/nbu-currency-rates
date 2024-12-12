import dayjs from 'dayjs';

export const isValidApiDate = (date) => {
    return /^[0-9]{8}$/.test(date) && dayjs(date, 'YYYYMMDD', true).isValid();
};
