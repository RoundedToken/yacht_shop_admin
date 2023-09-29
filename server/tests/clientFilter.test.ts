import { test, describe } from 'vitest';
import { testFetch } from '../utils/testFetch';

describe.concurrent('Client Filter', () => {
    const getSales = new testFetch('/get_sales');
    const getProducts = new testFetch('/get_products');

    test('Get Sales client: 11226', async ({ expect }) => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":null,"status":[1,-1],"isPaid":null,"product":null,"client":11226}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products client: 11226', async ({ expect }) => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":null,"status":[1,-1],"isPaid":null,"product":null,"client":11226}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales client: 11243', async ({ expect }) => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":null,"status":[1,-1],"isPaid":null,"product":null,"client":11243}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products client: 11243', async ({ expect }) => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":null,"status":[1,-1],"isPaid":null,"product":null,"client":11243}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });
});
