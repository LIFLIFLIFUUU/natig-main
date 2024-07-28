import { Router } from 'express';
import { getAllCharacters, getCharacterById, addCharacter, updateCharacter } from './character.controller';

const CharactersRouter = Router();

CharactersRouter
    .get('/', getAllCharacters)
    .get('/:id', getCharacterById)
    .post('/', addCharacter)
    .put('/:id', updateCharacter)

export default CharactersRouter
