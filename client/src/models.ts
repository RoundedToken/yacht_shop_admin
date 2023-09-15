export type TOrders = TOrder[];

export type TOrder = {
    orderId: number;
    orderDate: string;
    orderSum: number;
    productsCount: number | null;
    orderProducts: TProduct[] | null;
};

export type TProduct = {
    name: string;
    count: number;
    price: number;
    brand: string;
    id: number;
};
