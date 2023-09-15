import { RequestHandler } from 'express';
import salesService from '../services/salesService.js';
import { TGetOrderParams, TGetSalesParams } from '../types.js';

class SalesController {
    getSales: RequestHandler = async (req, res, next) => {
        try {
            const params = req.query as TGetSalesParams;

            const sqlResData = await salesService.getSales(params);

            return res.json(sqlResData);
        } catch (error) {
            next(error);
        }
    };

    getOrder: RequestHandler = async (req, res, next) => {
        try {
            const params = req.query as TGetOrderParams;

            const sqlResData = await salesService.getOrder(params);

            return res.json(sqlResData);
        } catch (error) {
            next(error);
        }
    };
}

export default new SalesController();
