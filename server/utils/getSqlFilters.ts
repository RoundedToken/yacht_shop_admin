import { IFilters } from '../types';

export const getSqlFilters = (filters: string, isProducts: boolean = false) => {
    const filtersObj = JSON.parse(filters) as IFilters;
    const productId = filtersObj.product;

    const filterStr =
        Object.entries(filtersObj)
            .filter((filter) => filter[1] !== null && filter[1] !== '')
            .map((filter) => {
                const key = filter[0];
                const value = filter[1];

                if (key === 'dateFrom') {
                    return `ord.DateEnter >= CAST('${value}T00:00:00' AS datetime)`;
                } else if (key === 'dateTo') {
                    return `ord.DateEnter <= CAST('${value}T23:59:59' AS datetime)`;
                } else if (key === 'status') {
                    return `ord.status IN (${value.join(',')})`;
                } else if (key === 'isPaid') {
                    return `ord.paid = ${value ? 1 : 0}`;
                } else if (key === 'product') {
                    if (isProducts) return '1=1';
                    else return `ordStr.tovar = ${value}`;
                } else if (key === 'client') {
                    return `ord.clientid = ${value}`;
                } else {
                    return `STUFF((SELECT DISTINCT ', ' + oplata.type  
                    FROM Oplata 
                    WHERE Oplata.orderid = ord.orderid  
                    FOR XML PATH('')), 1, 2, '') LIKE '%${value}%'`;
                }
            })
            .join(' AND ') || '1=1';

    return { filterStr, productId };
};
