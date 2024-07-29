import { MongoClient, ObjectId } from "mongodb";
import {collectionWorkingHours } from "./collectionWorkingHours.type";

const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME,
    working_hours_collection:'working_hours',
    office_worker_collection: 'office_workers'
}

export async function getAllWorkerHours(query = {}, projection = {}): Promise<any> {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.working_hours_collection).find(query, { projection }).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}


export async function getAllClientHours(query = {}, projection = {}): Promise<any> {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.working_hours_collection).find(query, { projection }).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}