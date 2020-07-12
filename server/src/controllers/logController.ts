import { Request, Response } from "express";
import connection from '../database/connection';

const logController = {
    async index(req: Request, res: Response) {
        const response = await connection('changelog')
            .select('*');

        return res.json(response);
    }
};

export default logController;