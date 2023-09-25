import { useFetch } from '../hooks/useFetch';
import { TOrderResponse } from '../models';
import styles from './Order.module.css';
import { getPrice } from '../utils/getPrice';
import { useOrderParams } from '../hooks/useOrderParams';
import { getDate } from '../utils/getDate';

const Order = () => {
    const { params, location } = useOrderParams();
    const { isLoading, data, isError } = useFetch<TOrderResponse>(`get_order`, params);
    const { order, products, payments } = data ?? {};

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <h1>Error! Order not found...</h1>;

    if (data)
        return (
            <div className={styles.root}>
                <button class={styles.backButton} onClick={() => location.route('/')}>
                    Main
                </button>

                <div>
                    <h3>Orders Info</h3>
                    <ul className={styles.orderList}>
                        <li>
                            <span class={styles.listTitle}>Id:</span>

                            {order.id}
                        </li>

                        <li>
                            <span class={styles.listTitle}>Date:</span>

                            {getDate(order.date)}
                        </li>

                        <li>
                            <span class={styles.listTitle}>Paid Sum:</span>

                            {getPrice(order.paidSum)}
                        </li>

                        <li>
                            <span class={styles.listTitle}>All Sum:</span>

                            {getPrice(order.allSum)}
                        </li>
                        <li>
                            <span class={styles.listTitle}>Position Count:</span>

                            {order.positionCount}
                        </li>
                        <li>
                            <span class={styles.listTitle}>Products Count:</span>

                            {order.productsCount}
                        </li>
                        <li>
                            <span class={styles.listTitle}>Status:</span>

                            {order.status}
                        </li>
                        <li>
                            <span class={styles.listTitle}>Client Name:</span>

                            {order.clientName}
                        </li>
                        <li>
                            <span class={styles.listTitle}>Is Paid:</span>

                            {String(order.isPaid)}
                        </li>
                    </ul>
                </div>

                <table class={styles.productsContainer}>
                    <caption>Products table</caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Count</th>
                            <th>Sum</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <a
                                        href={`https://yachtshop.ee/product/${product.id}`}
                                        target="_blank"
                                    >
                                        {product.id}
                                    </a>
                                </td>
                                <td>{product.name}</td>
                                <td>
                                    <a
                                        href={`https://yachtshop.ee/product_list/${product.categoryId}`}
                                        target="_blank"
                                    >
                                        {product.category}
                                    </a>
                                </td>
                                <td>{product.brand}</td>
                                <td>{getPrice(product.price)}</td>
                                <td>{product.count}</td>
                                <td>{getPrice(product.sum)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table class={styles.productsContainer}>
                    <caption>Payments table</caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Sum</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment.id}>
                                <td>{payment.id}</td>
                                <td>{getDate(payment.date)}</td>
                                <td>{getPrice(payment.sum)}</td>
                                <td>{payment.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );

    return null;
};

export default Order;
