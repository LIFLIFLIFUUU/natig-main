import { MongoClient, ObjectId, UpdateResult } from "mongodb";
import { collectionWorkingHours } from "./collectionWorkingHours.type";
import dotenv from 'dotenv';

dotenv.config();

const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME as string,
    working_hours_collection: 'working_hours'
};

export async function insertHoursToDb(hours: collectionWorkingHours) {
    const mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        const db = mongo.db(DB_INFO.db);
        const collection = db.collection(DB_INFO.working_hours_collection);
        return await collection.insertOne(hours);
    } catch (error) {
        throw error;
    } finally {
        await mongo.close();
    }
}

export async function updateHoursInDb(id: ObjectId, updatedHours: any): Promise<UpdateResult> {
    const mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        const db = mongo.db(DB_INFO.db);
        const collection = db.collection(DB_INFO.working_hours_collection);
        const updateDoc = {
            $set: updatedHours
        };
        console.log(`DB: updating hours with id: ${id}`);
        console.log('DB: updated hours:', updateDoc);

        const existingDocument = await collection.findOne({ _id: id });
        console.log('Existing Document:', existingDocument);

        if (!existingDocument) {
            console.log('Document not found');
            return { matchedCount: 0, modifiedCount: 0, acknowledged: true, upsertedCount: 0, upsertedId: null };
        }

        const result = await collection.updateOne({ _id: id }, updateDoc);
        console.log('Update result:', result);
        return result;
    } catch (error) {
        console.error('Error updating hours:', error);
        throw error;
    } finally {
        await mongo.close();
    }
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
