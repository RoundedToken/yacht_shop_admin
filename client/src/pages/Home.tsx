import { useFetch } from '../hooks/useFetch';
import { useLocation } from 'preact-iso';
import { TOrders } from '../models';

export function Home() {
    const location = useLocation();
    const { isLoading, data } = useFetch<TOrders>('/get_sales?limit=30');

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {data && (
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>date</th>
                            <th>sum</th>
                            <th>count</th>
                            <th>products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((sale, i) => (
                            <tr key={i}>
                                <td onClick={() => location.route(`/order/${sale.orderId}`)}>
                                    {sale.orderId}
                                </td>
                                <td>{sale.orderDate}</td>
                                <td>{sale.orderSum}</td>
                                <td>{sale.productsCount}</td>
                                <td>
                                    {/* <ul>
                                        {sale.orderProducts.map((product) => (
                                            <li key={product.id}>
                                                id: {product.id} <br />
                                                name: {product.name} <br />
                                                brand: {product.brand} <br />
                                                price: {product.price} <br />
                                                count: {product.count}
                                            </li>
                                        ))}
                                    </ul> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
