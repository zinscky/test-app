import { ResponseModel } from "../models/response-model";
import { Response } from 'express';

export class ResponseHelper {

    static handleResponse(response: ResponseModel, res: Response) {
        if(!response.success) {
            console.log("Error occured.", response.error);
        }
        return res.status(response.status).json(response);
    }
}