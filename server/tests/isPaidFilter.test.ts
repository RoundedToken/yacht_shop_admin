import { describe, expect, test } from 'bun:test';
import { testFetch } from '../utils/testFetch';

describe('Is Paid Filter', () => {
    const getSales = new testFetch('/get_sales');
    const getProducts = new testFetch('/get_products');

    test('Get Sales isPaid: false', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":null,"status":[1,-1],"isPaid":false,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products isPaid: false', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":null,"status":[1,-1],"isPaid":false,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales isPaid: true', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":null,"status":[1,-1],"isPaid":true,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products isPaid: true', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":null,"status":[1,-1],"isPaid":true,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });
});
