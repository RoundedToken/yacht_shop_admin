import { useLocation } from 'preact-iso';
import { useFetch } from '../hooks/useFetch';
import { useEffect } from 'preact/hooks';
import { TOrder } from '../models';
import styles from './Order.module.css';
import { getPrice } from '../utils/getPrice';

const Order = () => {
    const location = useLocation();
    const path = location.path.split('/');
    const orderNum = path[path.length - 1];
    const { isLoading, data } = useFetch<TOrder>(`/get_order?id=${orderNum}`);

    useEffect(() => {
        console.log(data);
    }, [data]);

    if (isLoading) return <div>Loading...</div>;

    if (data)
        return (
            <div className={styles.root}>
                <button class={styles.backButton} onClick={() => location.route('/')}>
                    Back
                </button>

                <ul className={styles.orderList}>
                    <li>
                        <span class={styles.listTitle}>orderId:</span>

                        {data.orderId}
                    </li>

                    <li>
                        <span class={styles.listTitle}>orderDate:</span>

                        {data.orderDate}
                    </li>

                    <li>
                        <span class={styles.listTitle}>orderSum:</span>

                        {data.orderSum}
                    </li>
                    <li>
                        <span class={styles.listTitle}>productsCount:</span>

                        {data.productsCount}
                    </li>
                </ul>

                <table class={styles.productsContainer}>
                    <caption>Products table</caption>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>price</th>
                            <th>count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.orderProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{getPrice(product.price)}</td>
                                <td>{product.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );

    return <div>Заказ не найден</div>;
};

export default Order;
