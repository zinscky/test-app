import { Injectable } from '@nestjs/common';
import { MongoProvider } from 'src/db/mongo-provider';
import { DepartmentRepository } from 'src/repository/department/department-repository';
import { DepartmentMaster } from 'src/models/department-master';
import { deepEqual } from 'assert';

@Injectable()
export class DepartmentService {
    constructor(private departmentRepo: DepartmentRepository) {
    }

    async createDepartment(data: any) {
        console.log(data);
        let department = new DepartmentMaster(data);
        console.log(department);
        let result = await this.departmentRepo.createDepartment(department);
        if(result) {
            return result;
        }
        else {
            throw new Error("Could not save department");
        }
    }

    async getAllDepartments() {
        return await this.departmentRepo.getAllDepartments();
    }

    async deleteAll() {
        await this.departmentRepo.deleteAll();
    }
}
