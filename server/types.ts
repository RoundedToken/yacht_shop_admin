export type TGetSalesParams = {
    pageSize: string;
    pageIndex: string;
    sortId: string;
    sortType: string;
    filters: string;
};

export type TGetOrderParams = {
    id: string;
};

export type TGetProductsParams = {
    pageSize: string;
    pageIndex: string;
    sortId: string;
    sortType: string;
    filters: string;
};

export interface IFilters {
    DateEnter: string | null;
    type: string | null;
    orderType?: string;
    product: string | null;
}
