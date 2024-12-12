import dayjs from 'dayjs';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

emailjs.init({
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    blockHeadless: true,
    limitRate: {
        id: 'app',
        throttle: 60 * 60 * 1000,
    },
});

export const sendCurrencyNotificationEmail = (currency, email) => {
    const templateParams = {
        name: currency?.txt,
        rate: currency?.rate,
        nbu: currency?.r030,
        code: currency?.cc,
        symbol: currency?.symbol,
        flag: currency?.flag,
        customRate: currency?.customRate,
        notifyOnHigherRate: currency?.notifyOnHigherRate,
        date: dayjs().format('DD.MM.YYYY'),
        email,
    };

    console.log({ templateParams });

    emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        })
        .catch((err) => {
            console.error('FAILED...', err);
        });
};
