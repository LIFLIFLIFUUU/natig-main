import { ObjectId } from "mongodb";
import { addCharacter, getCharacters, updateDoc } from "./character.db";
import { Character } from "./character.type";

export async function getAll() {
    return await getCharacters();
}

export async function getById(id: string) {
    let query = { _id: new ObjectId(id) }
    let [character] = await getCharacters(query);
    return character;
}

export async function insertCharacter(name: string) {
    let newCharacter: Character = { name }
    return await addCharacter(newCharacter);
}

export async function update(id: string, name: string, lightsaberColor?: string) {
    let character: Character = { name, lightsaberColor }
    return await updateDoc(id, character);
}