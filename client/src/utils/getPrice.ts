export const getPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('et-EE', {
        style: 'currency',
        currency: 'EUR',
    });
    return formatter.format(price);
};
