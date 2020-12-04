import { Injectable } from '@nestjs/common';
import { MongoProvider } from '../../db/mongo-provider';
import { Employee } from '../../models/employee';
import { Collection } from 'mongodb';

@Injectable()
export class EmployeeRepository {

    private collection: Collection<Employee>;
    private collectionName: string = "Employee";

    constructor(private mongoProvider: MongoProvider) {
        this.mongoProvider.getDB().then(db => {
            this.collection = db.collection(this.collectionName);
        }).catch(err => {
            console.log(err);
            process.exit(1);
        })
    }


    async addEmployee(employee: Employee) {
        let result = await this.collection.insertOne(employee);
        if(result.insertedCount == 1) {
            return result.ops[0];
        }
        else {
            return null;
        }
    }
}
