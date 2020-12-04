import { v4 } from 'uuid';

export class DepartmentMaster {
    _id: string = null;
    name: string = null;
    createdTime: Date = null;
    updatedTime: Date = null;

    constructor(data: any) {
        Object.keys(this).forEach(key => {
            if(data && data[key]) {
                this[key] = data[key];
            }
            else {
                delete this[key];
            }
        });
        if(!this._id) {
            this._id = v4();
        }
        if(!this.createdTime) {
            this.createdTime = new Date();
        }
        this.updatedTime = new Date();
    }
}