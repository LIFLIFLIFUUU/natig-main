import { MongoClient, ObjectId } from "mongodb";
import { Character } from "./character.type";

const DB_INFO = {
    host: process.env.CONNECTION_STRING as string,
    db: process.env.DB_NAME,
    collection: 'Characters'
}

export async function getCharacters(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.collection).find(query, { projection }).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function addCharacter(character: Character) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.collection).insertOne(character);
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function updateDoc(id: string, character: Character) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.collection).updateOne(
            { _id: new ObjectId(id) },
            { $set: character }
        );
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function getDocCount(query = {}) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.collection).countDocuments(query);
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

