import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { EmployeeService } from 'src/services/employee/employee.service';
import { Request, Response } from 'express';
import { ResponseModel } from 'src/models/response-model';
import { ResponseHelper } from 'src/helpers/response-helper';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {

    }

    @Post() 
    async createEmployee(@Req() req: Request, @Res() res: Response) {
        let response = new ResponseModel(HttpStatus.OK, true);
        try {
            let body = req.body;
            let result = await this.employeeService.createEmployee(body);
            if(result) {
                response.setData(result);
            }
            else {
                response.setError(HttpStatus.EXPECTATION_FAILED, {"message": "Could not save employee."});
            }
            return ResponseHelper.handleResponse(response, res);
        }
        catch(error) {
            response.setError(HttpStatus.INTERNAL_SERVER_ERROR, error);
            return ResponseHelper.handleResponse(response, res)
        }
    }
}
