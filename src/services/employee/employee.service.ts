import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repository/employee/employee-repository';
import { Employee } from 'src/models/employee';

@Injectable()
export class EmployeeService {

    constructor(private employeeRepo: EmployeeRepository) {

    }

    async createEmployee(data: any) {
        let employee = new Employee(data);

        let result = await this.employeeRepo.addEmployee(employee);
        if(result) {
            return result;
        }
        else {
            throw new Error("Error saving employee.");
        }

    }
}
