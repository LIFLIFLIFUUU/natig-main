import { Router } from 'express';
import {addHours,changeHours, getClientHours, getWorkerHours  } from './collectionWorkingHours.controller';

const  workingHoursRouter = Router();

workingHoursRouter
.post('/add', addHours)//תומר  v 
.put('/change/:id', changeHours)//תומר  v
.get('/client/:client_id', getClientHours)//עידו
.get('/worker/:worker_id', getWorkerHours)//עידו

export default  workingHoursRouter