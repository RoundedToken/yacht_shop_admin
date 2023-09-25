import { describe, expect, test } from 'bun:test';
import { testFetch } from '../utils/testFetch';

describe('Date Filter', () => {
    const getSales = new testFetch('/get_sales');
    const getProducts = new testFetch('/get_products');
    const params = {
        pageIndex: '0',
        pageSize: '50',
        sortId: 'Id',
        sortType: 'DESC',
        filters:
            '{"dateFrom":"2022-08-01","dateTo":"2022-08-04","payType":null,"status":[1,-1],"isPaid":null,"product":null,"client":null}',
    };

    test('Get Sales from 2022-08-01 to 2022-08-04', async () => {
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products from 2022-08-01 to 2022-08-04', async () => {
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });
});
