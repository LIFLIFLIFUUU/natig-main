import { ObjectId } from "mongodb"

export type Character = {
    _id?: ObjectId
    name: string,
    lightsaberColor?: string
}