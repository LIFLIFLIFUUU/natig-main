import { ObjectId } from "mongodb";

export type collectionWorkingHours={
    _id?:ObjectId,
    worker_id:ObjectId,
    client_id:ObjectId,
    day_of_work:Date,
    start_hour:Date,
    end_hour:Date
}