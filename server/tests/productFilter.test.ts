import { describe, expect, test } from 'bun:test';
import { testFetch } from '../utils/testFetch';

describe('Product Filter', () => {
    const getSales = new testFetch('/get_sales');

    test('Get Sales product: 58160', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-06-01","dateTo":"2022-08-04","payType":null,"status":[1,-1],"isPaid":false,"product":58160,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Get Products product: 58169', async () => {
        const params = {
            pageIndex: '0',
            pageSize: '10',
            sortId: 'Id',
            sortType: 'DESC',
            filters:
                '{"dateFrom":"2022-06-01","dateTo":"2022-08-04","payType":null,"status":[1,-1],"isPaid":false,"product":58169,"client":null}',
        };
        const data = await getSales.getData(params);

        expect(data).toMatchSnapshot();
    });
});
