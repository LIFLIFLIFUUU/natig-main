import { Router } from 'express';
import { addClient, getAllClients, getClientById, login,updateClient,deleteClient,addWorker} from './officeWorker.controller';
// TODO: addClient, updateClient

const officeWorkersRouter = Router();

officeWorkersRouter
    .get('/', getAllClients) // V
    .get('/:id', getClientById) // V
    .post('/addClient', addClient) // תומר
    .put('/:id', updateClient) //  v תומר
    .delete('/:id',deleteClient)//v תומר
    .post('/login', login) // V
     .post('/addWorker', addWorker) // v תומר
    // .get('/viewClientDocuments', viewClientDocuments) // ביחד
    // .post('/validateClientDocuments', validateClientDocuments) // ביחד
    export default officeWorkersRouter
