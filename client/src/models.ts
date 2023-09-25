export type TOrdersResponse = {
    orders: TOrders;
    pagesCount: number;
    rowsCount: number;
    clients: TClient[];
    totalAllSum: number;
    totalPaidSum: number;
    totalProductSum: number;
};

export type TOrders = TOrder[];

export type TClient = {
    id: number;
    name: string;
};

export type TOrder = {
    id: number;
    date: string;
    paidSum: number;
    positionCount: number | null;
    payType: string;
    clientName: number;
    status: string;
    isPaid: boolean;
    allSum: number;
    productsCount: number;
    productsSum: number;
};

export type TOrderResponse = {
    order: TOrder;
    products: TProducts;
    payments: TPayments;
};

export type TPayments = TPayment[];

export type TPayment = {
    id: number;
    type: string;
    sum: number;
    date: string;
};

export type TProducts = TProduct[];

export type TProduct = {
    name: string;
    count: number;
    price: number;
    brand: string;
    id: number;
    category: string;
    sum: number;
    categoryId: number;
};

export type TUpdateFilter = <K extends keyof IFilters>(key: K, value: IFilters[K]) => void;
export type TUpdateStatus = (value: TStatusValue, isAdd: boolean) => void;
export type TUpdateDateFrom = (date: string | null, isShortcut?: boolean) => void;
export type TUpdateDateTo = (date: string | null) => void;

export interface IFilters {
    dateFrom: string | null;
    dateTo: string | null;
    payType: string | null;
    status: TStatus;
    isPaid: boolean | null;
    product: number | null;
    client: number | null;
}

export type TStatus = Set<TStatusValue>;
export type TStatusValue = 0 | 1 | 2 | 3 | -1;

export type TProductsResponse = {
    pagesCount: number;
    rowsCount: number;
    products: TInfoProduct[];
};

export type TInfoProduct = {
    avgPrice: number;
    maxPrice: number;
    minPrice: number;
    name: string;
    ordersCount: number;
    totalSum: number;
    totalCount: number;
    id: number;
};
