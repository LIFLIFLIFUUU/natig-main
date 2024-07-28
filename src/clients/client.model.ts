import { MongoClient, ObjectId } from "mongodb";
import { getClients } from "./client.db";
import { client } from "./client.type";



export async function findByEmailAndPassword(email: string, password: string):Promise<any> {
    let query = { email, password };
    let projection = { password: 0 };
    let client = await getClients(query, projection);
    return client[0];
  }