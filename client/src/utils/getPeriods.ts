const toIso = (mils: number) => {
    const now = Date.now();

    return new Date(now - mils).toISOString();
};
const getThisWeek = () => {
    const today = new Date();

    const dayOfWeek = today.getDay() || 7;

    const monday = new Date(today.getTime() - (dayOfWeek - 1) * 24 * 60 * 60 * 1000);

    return monday.toISOString();
};

const getThisMonth = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1, 23, 59);

    return firstDay.toISOString();
};

const getThisYear = () => {
    const today = new Date();

    const year = today.getFullYear();

    const firstDay = new Date(year, 0, 1, 23, 59);

    return firstDay.toISOString();
};

export const getPeriods = () => {
    const today = new Date().toISOString();
    const thisWeek = getThisWeek();
    const week = toIso(1000 * 60 * 60 * 24 * 7);
    const month = toIso(1000 * 60 * 60 * 24 * 30);
    const thisMonth = getThisMonth();
    const thisYear = getThisYear();
    const year = toIso(1000 * 60 * 60 * 24 * 365);

    return { week, month, year, today, thisWeek, thisMonth, thisYear };
};
