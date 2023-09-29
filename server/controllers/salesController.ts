import { RequestHandler } from 'express';
import salesService from '../services/salesService';
import { TGetOrderParams, TGetProductsParams, TGetSalesParams } from '../types';

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

    getProducts: RequestHandler = async (req, res, next) => {
        try {
            const params = req.query as TGetProductsParams;

            const sqlResData = await salesService.getProducts(params);

            return res.json(sqlResData);
        } catch (error) {
            next(error);
        }
    };
}

export default new SalesController();
