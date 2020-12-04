import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { DepartmentMaster } from '../../models/department-master';
import { MongoProvider } from '../../db/mongo-provider';

@Injectable()
export class DepartmentRepository {

    private collection: Collection<DepartmentMaster>;
    private collectionName: string = "DepartmentMaster";

    constructor(private mongoProvider: MongoProvider) {
        this.mongoProvider.getDB().then(db => {
            this.collection = db.collection(this.collectionName);
        }).catch(err => {
            console.log(err);
            process.exit(1);
        })
    }

    async createDepartment(department: DepartmentMaster) {
        let result = await this.collection.insertOne(department);
        if(result.insertedCount == 1) {
            return result.ops[0];
        }
        else {
            return null;
        }
    }

    async getAllDepartments() {
        let result = await this.collection.find({}).toArray();
        if(result && result.length > 0) {
            return result;
        }
        else {
            return null;
        }
    }

    async deleteAll() {
        await this.collection.deleteMany({});
    }
}
