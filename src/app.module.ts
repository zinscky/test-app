import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoProvider } from './db/mongo-provider';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './services/employee/employee.service';
import { EmployeeRepository } from './repository/employee/employee-repository';
import { DepartmentRepository } from './repository/department/department-repository';
import { DepartmentController } from './controllers/department/department.controller';
import { DepartmentService } from './services/department/department.service';

@Module({
  imports: [],
  controllers: [AppController, EmployeeController, DepartmentController],
  providers: [AppService, MongoProvider, EmployeeService, EmployeeRepository, DepartmentRepository, DepartmentService],
})
export class AppModule {}
