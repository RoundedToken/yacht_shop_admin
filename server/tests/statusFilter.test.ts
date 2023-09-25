import { describe, expect, test } from 'bun:test';
import { testFetch } from '../utils/testFetch';

describe('Status Filter', () => {
    const getSales = new testFetch('/get_sales');
    const getProducts = new testFetch('/get_products');

    test('Get Sales status [3]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-07-01","dateTo":"2022-08-04","payType":null,"status":[3],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products status [3]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-07-01","dateTo":"2022-08-04","payType":null,"status":[3],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales status [0]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-07-01","dateTo":"2022-08-04","payType":null,"status":[0],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products status [0]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-05-01","dateTo":"2022-06-04","payType":null,"status":[0],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales status [2]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-06-01","dateTo":"2022-08-04","payType":null,"status":[2],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products status [2]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-03-01","dateTo":"2022-05-04","payType":null,"status":[2],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales status [-1]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-08-01","dateTo":"2022-08-04","payType":null,"status":[-1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products status [-1]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-08-01","dateTo":"2022-08-04","payType":null,"status":[-1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales status [1]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-07-01","dateTo":"2022-08-04","payType":null,"status":[1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products status [1]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-07-01","dateTo":"2022-08-04","payType":null,"status":[1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales status [0, 2, 3]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-06-01","dateTo":"2022-08-04","payType":null,"status":[0,2,3],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products status [0, 2, 3]', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-06-01","dateTo":"2022-08-04","payType":null,"status":[0,2,3],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });
});
