import { Injectable } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { MongoConfig } from '../configs/mongo-config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MongoProvider {

    client: MongoClient;
    config: MongoConfig;

    constructor() {
        this.loadConfig();
        this.connect();
    }

    loadConfig() {
        let homepath = process.env.HOME_PATH || "./properties";
        let mongoConfigFile = process.env.MONGO_CONFIG_FILENAME || "mongoConfig.json";
        this.config = JSON.parse(fs.readFileSync(path.join(homepath, "conf", mongoConfigFile), { encoding: "utf-8", flag: "r" }));
        return this.config;
    }

    loadConfigRemote(mongoConfig: any) {
        this.config = mongoConfig;
        return this.config;
    }

    async connect() {
        let uri = "mongodb://" + this.config.mongoHosts;
        this.client = await MongoClient.connect(uri, this.config.mongoClientOptions);
    }


    async getDB() {
        try {
            if (this.client && this.client.isConnected) {
                return this.client.db(this.config.dbName);
            }
            else {
                this.loadConfig();
                await this.connect();
                return this.client.db(this.config.dbName);
            }
        }
        catch (e) {
            console.error("Mongo connection error: ", e);
            process.exit(1);
        }
    }

    async disconnect() {
        await this.client.close(true);
    }

}
