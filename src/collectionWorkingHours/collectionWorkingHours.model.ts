import { MongoClient, ObjectId } from "mongodb";
import { getAllWorkerHours } from "./collectionWorkingHours.db";

export async function getWorkerHoursByWorkerId(worker_id: string) {
  let query = { worker_id: new ObjectId(worker_id) };
  console.log('worker_id', worker_id);
  let projection = {
      _id: 1,
      worker_id: 1,
      client_id: 1,
      day_of_work: 1,
      start_hour: 1,
      end_hour: 1
  };
  let [worker_hours] = await getAllWorkerHours(query, projection);
  console.log('worker_hours', worker_hours);
  return worker_hours;
}

  //     let query = { _id: new ObjectId(worker_id) }
//     let projection = { password: 0 }
//   let [officeworker] = await findAll(query, projection);
//   return officeworker;
