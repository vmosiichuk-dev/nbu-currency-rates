export const shouldSendEmail = (currency, emailState) => {
    const { rate, customRate, notifyOnHigherRate } = currency;
    const { lastNotifiedRate, lastNotificationTime } = emailState;

    const now = new Date();
    const timeElapsed = now - new Date(lastNotificationTime);

    const isThresholdCrossed =
        (notifyOnHigherRate && rate > customRate && rate > lastNotifiedRate) ||
        (!notifyOnHigherRate && rate < customRate && rate < lastNotifiedRate);

    const timeLimitReached =
        !lastNotificationTime || timeElapsed > 24 * 60 * 60 * 1000;

    return isThresholdCrossed && timeLimitReached;
};

console.log(typeof shouldSendEmail);
