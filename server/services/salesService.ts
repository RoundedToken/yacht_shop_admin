import sql from 'mssql';
import { TGetOrderParams, TGetProductsParams, TGetSalesParams } from '../types';
import { getSqlFilters } from '../utils/getSqlFilters';

class SalesService {
    async getOrder({ id }: TGetOrderParams) {
        const dataOrderPromise = sql.query(`
        SELECT
        ord.orderid AS id,
        ord.DateEnter AS date,
        ord.paid AS isPaid,
        status.name AS status,
        clients.name AS clientName,
        (
            SELECT
            SUM(oplata.summa)
            FROM oplata
            WHERE oplata.orderid = ord.orderid
        ) as paidSum,
        (
            SELECT
            CASE
                WHEN ord.status = -1 OR ord.status = 0 THEN COUNT(ordStr.tovar) * -1
                ELSE COUNT(ordStr.tovar)
            END
            FROM ordStr
            INNER JOIN goods ON goods.tovar = ordStr.tovar
            WHERE ordStr.orderId = ord.OrderID
        ) as positionCount,
        (
            SELECT
            CASE
                WHEN ord.status = -1 OR ord.status = 0 THEN SUM(ordStr.qty) * -1
                ELSE SUM(ordStr.qty) 
            END
            FROM ordStr
            WHERE ordStr.orderid = ord.orderid 
        ) as productsCount,
        (
            SELECT
            CASE
                WHEN ord.status = -1 OR ord.status = 0 THEN SUM(ordStr.qty * ordStr.price)
                ELSE SUM(ordStr.qty * ordStr.price) * -1
            END
            FROM ordStr
            WHERE ordStr.orderid = ord.orderid 
        ) as productsSum,
        (
            SELECT
            CASE
                WHEN ord.status = -1 OR ord.status = 0 THEN SUM(ordStr.qty * ordStr.price)
                ELSE SUM(ordStr.qty * ordStr.price) * -1
            END
            FROM ordStr
            WHERE ordStr.orderid = ord.orderid
        ) as allSum
        FROM ord
        LEFT JOIN Oplata ON ord.orderid = oplata.orderid
        INNER JOIN status ON status.id = ord.status
        LEFT JOIN Clients ON ord.ClientId = Clients.id
        WHERE ord.orderid = ${id}
        `);
        const dataProductsPromise = sql.query(`
        SELECT 
        ordStr.tovar AS id,
        ordStr.qty AS count,
        ordStr.price,
        goods.name,
        goods.brand,
        nav.name AS category,
        nav.id AS categoryId,
        ordStr.qty * ordStr.price AS sum
        FROM ord
        INNER JOIN ordStr ON ord.orderid = ordStr.orderid
        INNER JOIN goods ON goods.tovar = ordStr.tovar
        LEFT JOIN nav ON nav.id = goods.subr
        WHERE ord.orderid = ${id}   
        `);
        const dataPaymentsPromise = sql.query(`
        SELECT
        oplata.oplataid as id,
        oplata.type,
        oplata.dateEnter as date,
        oplata.summa as sum
        FROM ord
        INNER JOIN Oplata ON ord.orderid = oplata.orderid
        WHERE ord.orderid = ${id}
        `);

        try {
            const [dataOrder, dataProducts, dataPayments] = await Promise.all([
                dataOrderPromise,
                dataProductsPromise,
                dataPaymentsPromise,
            ]);

            return {
                order: dataOrder.recordset[0],
                products: dataProducts.recordset,
                payments: dataPayments.recordset,
            };
        } catch (error) {
            console.log(error);

            throw new Error('Error in getOrder');
        }
    }

    async getSales({ pageIndex, pageSize, sortId, sortType, filters }: TGetSalesParams) {
        const { filterStr, productId } = getSqlFilters(filters);
        const dataCountPromise = sql.query(`
        SELECT
        COUNT(DISTINCT ord.orderid) as count,
        SUM(  CASE
            WHEN ord.status = -1 OR ord.status = 0 THEN ordStr.qty * ordStr.price
            ELSE ordStr.qty * ordStr.price * -1
        END) as totalProductSum
        
        FROM ord
        INNER JOIN ordStr ON ordStr.orderid = ord.orderid
        WHERE ord.status <> 4
        AND ${filterStr}
        `);
        const dataCount2Promise = sql.query(`
        SELECT SUM(t.allSum) AS totalAllSum,
        SUM(t.qq) as totalPaidSum
        FROM (
                SELECT 
                (
                    SELECT
                    CASE 
                        WHEN ord.status = -1 OR ord.status = 0 THEN SUM(ordStr.qty * ordStr.price)  
                        ELSE SUM(ordStr.qty * ordStr.price) * -1 
                    END 
                    FROM ordStr 
                    WHERE ordStr.orderid = ord.orderid
                ) as allSum,
                (
                    SELECT
                    SUM(oplata.summa)
                    FROM oplata
                    WHERE oplata.orderid = ord.orderid
                ) as qq
                FROM ord
                INNER JOIN ordStr ON ordStr.orderid = ord.orderid
                INNER JOIN status ON ord.status = status.id
                WHERE ord.status <> 4
                AND ${filterStr} 
                GROUP BY ord.orderid, ord.status
        ) t
        `);
        const dataOrdersPromise = sql.query(`
        SELECT
        ord.orderid AS id,
        ord.DateEnter AS date,
        Clients.name as clientName,
        status.name as status,
        ord.paid as isPaid,
        (
            SELECT
            SUM(oplata.summa)
            FROM Oplata
            WHERE Oplata.orderid = ord.orderid
        ) as paidSum,
        STUFF((SELECT DISTINCT ', ' + oplata.type  
        FROM Oplata 
        WHERE Oplata.orderid = ord.orderid  
        FOR XML PATH('')), 1, 2, '') as payType,
        (
            SELECT
            CASE
                WHEN ord.status = -1 OR ord.status = 0 THEN SUM(ordStr.qty * ordStr.price)
                ELSE SUM(ordStr.qty * ordStr.price) * -1
            END
            FROM ordStr
            WHERE ordStr.orderid = ord.orderid
        ) as allSum,
        (
            SELECT
            CASE
                WHEN ord.status = -1 OR ord.status = 0 THEN SUM(ordStr.qty) * -1
                ELSE SUM(ordStr.qty) 
            END
            FROM ordStr
            WHERE ordStr.orderid = ord.orderid ${
                productId === null ? '' : `AND ordstr.tovar = ${Number(productId)}`
            }
        ) as productsCount,
        (
            SELECT
            CASE
                WHEN ord.status = -1 OR ord.status = 0 THEN SUM(ordStr.qty * ordStr.price)
                ELSE SUM(ordStr.qty * ordStr.price) * -1
            END
            FROM ordStr
            WHERE ordStr.orderid = ord.orderid ${
                productId === null ? '' : `AND ordstr.tovar = ${Number(productId)}`
            }
        ) as productsSum,
        (
            SELECT
            CASE
                WHEN ord.status = -1 OR ord.status = 0 THEN COUNT(ordStr.tovar)
                ELSE COUNT(ordStr.tovar)
            END
            FROM ordStr
            WHERE ordStr.orderId = ord.OrderID
          ) as positionCount
        FROM ord 
        INNER JOIN ordStr ON ordStr.orderid = ord.orderid
        INNER JOIN status ON ord.status = status.id
        LEFT JOIN Clients ON ord.ClientId = Clients.id
        WHERE ord.status <> 4 
        AND ${filterStr} 
        GROUP BY ord.orderid ,ord.DateEnter ,Clients.name  ,status.name ,ord.paid, ord.status
        ORDER BY ${sortId} ${sortType}
        OFFSET ${+pageIndex * +pageSize} ROWS FETCH NEXT ${pageSize} ROWS ONLY;
        `);
        const dataClientsPromise = sql.query(`
        SELECT DISTINCT
        clients.id,
        clients.name
        FROM ord 
        LEFT JOIN Clients ON ord.ClientId = Clients.id
        WHERE ord.status <> 4 
        `);

        try {
            const [dataCount, dataOrders, dataClients, dataCount2] = await Promise.all([
                dataCountPromise,
                dataOrdersPromise,
                dataClientsPromise,
                dataCount2Promise,
            ]);

            const rowsCount = dataCount.recordset[0]['count'];
            const pagesCount = Math.ceil(rowsCount / +pageSize);
            const totalPaidSum = dataCount2.recordset[0]['totalPaidSum'];
            const totalProductSum = dataCount.recordset[0]['totalProductSum'];
            const totalAllSum = dataCount2.recordset[0]['totalAllSum'];

            return {
                orders: dataOrders.recordset,
                pagesCount,
                rowsCount,
                totalPaidSum,
                totalProductSum,
                clients: dataClients.recordset,
                totalAllSum,
            };
        } catch (error) {
            console.log(error);

            throw new Error('Error in getSales');
        }
    }

    async getProducts({ pageIndex, pageSize, sortId, sortType, filters }: TGetProductsParams) {
        const { filterStr } = getSqlFilters(filters, true);

        const dataCountPromise = sql.query(`  
        SELECT 
        COUNT(DISTINCT goods.name) as count
        FROM ord 
            LEFT JOIN Oplata ON ord.orderid = Oplata.orderid
            INNER JOIN ordStr ON ord.orderid = ordstr.orderid
            INNER JOIN goods ON goods.tovar = ordStr.tovar
            LEFT JOIN Clients ON ord.ClientId = Clients.id
            WHERE ord.status <> 4
            AND ${filterStr}
        `);
        const dataProductsPromise = sql.query(`
            SELECT
                goods.tovar AS id,
                goods.name,
                COUNT(*) AS ordersCount,
                SUM(
                    CASE 
                        WHEN ord.status = -1 OR ord.status = 0 THEN ordStr.qty * -1 
                        ELSE ordStr.qty
                    END
                ) AS totalCount,
                MIN(ordStr.price) AS minPrice,
                MAX(ordStr.price) AS maxPrice,
                AVG(ordStr.price) AS avgPrice,
                SUM(
                    CASE 
                        WHEN ord.status = -1 OR ord.status = 0 THEN ordStr.price * ordStr.qty
                        ELSE ordStr.price * ordStr.qty * -1
                    END
                ) AS totalSum
            FROM ord 
            INNER JOIN ordStr ON ord.orderid = ordstr.orderid
            INNER JOIN goods ON goods.tovar = ordStr.tovar
            LEFT JOIN Clients ON ord.ClientId = Clients.id
            WHERE ord.status <> 4
            AND ${filterStr}
            GROUP BY goods.name, goods.tovar 
            ORDER BY ${sortId} ${sortType}     
            OFFSET ${pageIndex} * ${pageSize} ROWS FETCH NEXT ${pageSize} ROWS ONLY;
  `);

        try {
            const [dataCount, dataProducts] = await Promise.all([
                dataCountPromise,
                dataProductsPromise,
            ]);

            const rowsCount = dataCount.recordset[0]['count'];
            const pagesCount = Math.ceil(rowsCount / +pageSize);

            return { pagesCount, rowsCount, products: dataProducts.recordset };
        } catch (error) {
            console.log(error);

            throw new Error('Error in getProducts');
        }
    }
}

export default new SalesService();
