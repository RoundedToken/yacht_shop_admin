import { describe, expect, test } from 'bun:test';
import { testFetch } from '../utils/testFetch';

describe('Get Order', () => {
    const getOrder = new testFetch('/get_order');

    test('Order 204811', async () => {
        const params = { id: '204811' };
        const data = await getOrder.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Order 204453', async () => {
        const params = { id: '204453' };
        const data = await getOrder.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Order 204426', async () => {
        const params = { id: '204426' };
        const data = await getOrder.getData(params);

        expect(data).toMatchSnapshot();
    });

    test('Order 205162', async () => {
        const params = { id: '205162' };
        const data = await getOrder.getData(params);

        expect(data).toMatchSnapshot();
    });
});
