import { describe, expect, test } from 'bun:test';
import { testFetch } from '../utils/testFetch';

describe('Pay Type Filter', () => {
    const getSales = new testFetch('/get_sales');
    const getProducts = new testFetch('/get_products');

    test('Get Sales payType: Нал', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":"Нал","status":[1,-1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products payType: Нал', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":"Нал","status":[1,-1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales payType: Visa', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":"Visa","status":[1,-1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products payType: Visa', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":"Visa","status":[1,-1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Sales payType: payType: Б/н', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":"Б/н","status":[1,-1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products payType: payType: Б/н', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2020-11-01","dateTo":"2022-10-04","payType":"Б/н","status":[1,-1],"isPaid":null,"product":null,"client":null}',
        };
        const data = await getProducts.getData(params);

        expect(data).toMatchSnapshot();
    });
});
