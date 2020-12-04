export class ResponseModel {
    status: number;
    success: boolean;
    data: any;
    error: any;

    constructor(status: number, success: boolean) {
        this.status = status;
        this.success = success;
    }

    setData(data: any) {
        this.data = data;
    }

    setError(status: number, error: any) {
        this.status = status;
        this.error = error;
        this.success = false;
    }
}