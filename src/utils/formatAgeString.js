export const formatAgeString = (dateTimeString) => {
    const old = new Date(dateTimeString);
    const now = new Date();
    const difference = now - old;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    if (days > 0) return formatString(days, 'day');
    if (hours > 0) return formatString(hours, 'hour');
    if (minutes > 0) return formatString(minutes, 'min');
    if (seconds > 0) return formatString(seconds, 'sec');
    return `just now`;
};

const formatString = (data, string) => `${data} ${string}${data > 1 ? 's' : ''} ago`;