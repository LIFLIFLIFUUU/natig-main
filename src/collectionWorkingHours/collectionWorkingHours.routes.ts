import { Router } from 'express';
// import { getAllCharacters, getCharacterById, addCharacter, updateCharacter } from './character.controller';
import { getWorkerHours } from './collectionWorkingHours.controller';

const workingHoursRouter = Router();

workingHoursRouter
// .post('/add', addHours)//תומר
// .put('/change/:id', changeHours)//תומר
// .get('/client/:id', getClientHours)//עידו
.get('/worker/:worker_id', getWorkerHours)//עידו

export default workingHoursRouter