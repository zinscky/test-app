import { Controller, Post, Req, Res, HttpStatus, Get, Delete } from '@nestjs/common';
import { DepartmentService } from 'src/services/department/department.service';
import { Request, Response } from 'express';
import { ResponseModel } from 'src/models/response-model';
import { ResponseHelper } from 'src/helpers/response-helper';

@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService) {

    }

    @Post("") 
    async dreateDepartment(@Req() req: Request, @Res() res: Response) {
        let response = new ResponseModel(HttpStatus.OK, true);
        try {
            let body = req.body;
            let result = await this.departmentService.createDepartment(body);
            if(result) {
                response.setData(result);
            }
            else {
                response.setError(HttpStatus.EXPECTATION_FAILED, {"message": "Could not save department."});
            }
            return ResponseHelper.handleResponse(response, res);
        }
        catch(error) {
            response.setError(HttpStatus.INTERNAL_SERVER_ERROR, error);
            return ResponseHelper.handleResponse(response, res)
        }
    }

    @Post("/bulk") 
    async dreateDepartmentBulk(@Req() req: Request, @Res() res: Response) {
        let response = new ResponseModel(HttpStatus.OK, true);
        try {
            // TODO
            // Implement logic to save departments in bulk.
            // Request body will contain an array of departments.

            response.setError(HttpStatus.NOT_IMPLEMENTED, {"message": "Not Implemented"});
            return ResponseHelper.handleResponse(response, res);
        }
        catch(error) {
            response.setError(HttpStatus.INTERNAL_SERVER_ERROR, error);
            return ResponseHelper.handleResponse(response, res)
        }
    }

    @Get("") 
    async getAllDepartments(@Req() req: Request, @Res() res: Response) {
        let response = new ResponseModel(HttpStatus.OK, true);
        try {
            let result = await this.departmentService.getAllDepartments();
            if(result && result.length > 0) {
                response.setData(result);
            }
            else {
                response.setError(HttpStatus.NO_CONTENT, null);
            }
            return ResponseHelper.handleResponse(response, res);
        }
        catch(error) {
            response.setError(HttpStatus.INTERNAL_SERVER_ERROR, error);
            return ResponseHelper.handleResponse(response, res)
        }
    }

    @Delete("") 
    async deleteAll(@Req() req: Request, @Res() res: Response) {
        let response = new ResponseModel(HttpStatus.OK, true);
        try {
            await this.departmentService.deleteAll();
            response.setData({message: "deleted"});
            return ResponseHelper.handleResponse(response, res);
        }
        catch(error) {
            response.setError(HttpStatus.INTERNAL_SERVER_ERROR, error);
            return ResponseHelper.handleResponse(response, res)
        }
    }
}
