import { MongoClient, ObjectId } from "mongodb";
import { addClient, getClients, updateDoc, findAll, addClientToDatabase, deleteDoc, addWorkerToDatabase } from "./officeWorker.db";
import { officeWorker, Position } from "./officeWorker.type";
//import { getClients } from "../clients/client.db";
import { client, ClientType, address, documents } from "../clients/client.type";

export async function getAll() {
  return await getClients();
}

export async function getById(id: string) {
  let query = { _id: new ObjectId(id) }
  let [client] = await getClients(query);
  return client;
}
export async function getByEmail(email: string) {
  let query = { email };
  let [client] = await getClients(query);
  return client;
}

export async function getWorkerById(id: string) {
  let query = { _id: new ObjectId(id) }
  let projection = { password: 0 }
  let [officeworker] = await findAll(query, projection);
  return officeworker;
}

// פונקציה להוספת לקוח
export async function insertClient(
  client_name: string,
  client_type: ClientType,
  address: address,
  mobile_number: string,
  income_tax_file: number,
  vat_file_number: number,
  email: string,
  password: string,
  home_number?: string,
  documents?: documents
) {
  const newClient: client = {
    _id: new ObjectId(),
    client_name,
    client_type,
    address,
    mobile_number,
    home_number,
    income_tax_file,
    vat_file_number,
    email,
    password,
    documents
  };

  return await addClientToDatabase(newClient);
}

export async function findByEmailAndPassword(email: string, password: string) {
  let query = { email, password };
  let projection = { password: 0 };
  let officeworker = await findAll(query, projection);
  return officeworker[0];
}


// export async function getOfficeWorkers(): Promise<any> {
//     // const mongo = new MongoClient(DB_INFO.host);
//     // try {
//     //   await mongo.connect();
//     //   const collection = mongo.db(DB_INFO.db).collection(DB_INFO.collection);
//     //   const result = await collection.find().toArray();
//     //   console.log('Fetched office workers:', result); // Log fetched data
//     //   return result;
//     // } catch (error) {
//     //   console.error('Error fetching office workers:', error);
//     //   throw error;
//     // } finally {
//     //   await mongo.close();
//     // }


//     let query = { _id: new ObjectId(id) }
//     let [client] = await getClients(query);
//     return client;
//     //!!!!!!!!!!!!!!!

//     //בנייה של השאילתא
//     //שליחת השאילתא לפןנקציה בדיבי
//   }

export async function updateClientInDb(
  _id: ObjectId,
  updatedClient: client
) {
  return await updateDoc(_id, updatedClient);
}
export async function deleteClientFromDb(
  _id: ObjectId
) {
  return await deleteDoc(_id);
}

export async function insertWorker(
  full_name: string,
  address: address,
  phone: string,
  home_phone: string,
  position: Position,
  personal_id: string,
  start_date: Date,
  email: string,
  password: string
) {
  const newWorker: officeWorker = {
    _id: new ObjectId(),
    full_name,
    address,
    phone,
    home_phone,
    position,
    personal_id,
    start_date,
    email,
    password
  };

  return await addWorkerToDatabase(newWorker);
}