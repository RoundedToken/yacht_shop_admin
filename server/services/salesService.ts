import sql from 'mssql';
import { TGetOrderParams, TGetSalesParams } from '../types';

class SalesService {
    async getOrder({ id }: TGetOrderParams) {
        const data = (
            await sql.query(`
            SELECT
            O.OplataID AS orderId,
            O.DateEnter AS orderDate,
            O.Summa AS orderSum,
            JSON_QUERY( 
                (
                  SELECT 
                    P.tovar AS id,
                    P.qty AS count,
                    P.price,
                    G.name,
                    G.brand  
                  FROM ordStr P 
                  INNER JOIN goods G ON G.tovar = P.tovar
                  WHERE P.orderId = O.OrderID
                  FOR JSON PATH  
                ),
                '$'
              ) AS orderProducts
          FROM Oplata O
          WHERE O.OplataID = ${id}
        `)
        ).recordset[0];

        if (data) {
            data.orderProducts = data?.orderProducts ? JSON.parse(data.orderProducts) : null;
            data.productsCount = data?.orderProducts?.length ?? null;
        }

        return data;
    }

    async getSales({ limit }: TGetSalesParams) {
        const data = (
            await sql.query(`
            SELECT
            O.OplataID AS orderId,
            O.DateEnter AS orderDate,
            O.Summa AS orderSum,
            JSON_QUERY( 
                (
                  SELECT 
                    P.tovar AS id,
                    P.qty AS count,
                    P.price,
                    G.name,
                    G.brand  
                  FROM ordStr P 
                  INNER JOIN goods G ON G.tovar = P.tovar
                  WHERE P.orderId = O.OrderID
                  FOR JSON PATH  
                ),
                '$'
              ) AS orderProducts
          FROM Oplata O
    
          ORDER BY O.DateEnter DESC
          OFFSET 500 ROWS FETCH NEXT ${limit} ROWS ONLY;
        `)
        ).recordset;

        return data.map((record) => {
            record.orderProducts = JSON.parse(record.orderProducts);
            record.productsCount = record.orderProducts.length;

            return record;
        });
    }
}

export default new SalesService();
