import { Router } from 'express';
// import { getAllCharacters, getCharacterById, addCharacter, updateCharacter } from './character.controller';
import { getClientHours, getWorkerHours } from './collectionWorkingHours.controller';

const workingHoursRouter = Router();

workingHoursRouter
// .post('/add', addHours)//תומר
// .put('/change/:id', changeHours)//תומר
.get('/client/:client_id', getClientHours)//עידו
.get('/worker/:worker_id', getWorkerHours)//עידו

export default workingHoursRouter