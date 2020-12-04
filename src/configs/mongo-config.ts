import { MongoClientOptions } from 'mongodb';
export interface MongoConfig {
    mongoClientOptions?: MongoClientOptions;
    mongoHosts?: string;
    dbName?: string;
}