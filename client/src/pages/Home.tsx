import { TClient, TStatus, TUpdateFilter } from '../models';
import PeriodRadioGroup from '../modules/Filters/PeriodRadioGroup';
import OrdersTable from '../modules/Tables/OrdersTable';
import ProductsTable from '../modules/Tables/ProductsTable';
import { useFilters } from '../hooks/useFilters';
import StatusGroup from '../modules/Filters/StatusGroup';
import { createContext } from 'preact';
import PayTypeGroup from '../modules/Filters/PayTypeGroup';
import IsPaidGroup from '../modules/Filters/IsPaidGroup';
import ProductFilter from '../modules/Filters/ProductFilter';
import { useState } from 'preact/hooks';
import PeriodInput from '../modules/Filters/PeriodInput';
import VisibilityToggle from '../modules/Toggles/VisibilityToggle';
import ClientsFilter from '../modules/Filters/ClientsFilter';

export const filterContext = createContext<{ status: TStatus; updateFilter: TUpdateFilter }>(null);

export function Home() {
    const {
        filters,
        updateFilter,
        updateStatus,
        status,
        product,
        dateFrom,
        dateTo,
        updateDateFrom,
        updateDateTo,
    } = useFilters();
    const [clients, setClients] = useState<TClient[] | undefined>();
    const [isShowToggle, setIsShowToggle] = useState(false);

    return (
        <div>
            <div className="filters">
                <filterContext.Provider value={{ status, updateFilter }}>
                    <PeriodRadioGroup updateDateFrom={updateDateFrom} />

                    <PeriodInput date={dateFrom} updateDate={updateDateFrom} />

                    <PeriodInput date={dateTo} updateDate={updateDateTo} />

                    <StatusGroup updateFilterStatus={updateStatus} />

                    <PayTypeGroup />

                    <VisibilityToggle
                        isShowToggle={isShowToggle}
                        setIsShowToggle={setIsShowToggle}
                    />

                    <ProductFilter product={product} />

                    <ClientsFilter clients={clients} />

                    <IsPaidGroup />
                </filterContext.Provider>
            </div>

            <div className="tablesContainer">
                <OrdersTable
                    filters={filters}
                    setClients={setClients}
                    isShowToggle={isShowToggle}
                />

                <ProductsTable
                    updateFilter={updateFilter}
                    filters={filters}
                    isShowToggle={isShowToggle}
                />
            </div>
        </div>
    );
}
