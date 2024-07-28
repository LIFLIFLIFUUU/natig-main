import { Router } from 'express';
import { login, RetrievedDocuments, UpdateDocuments } from './client.controller';

const clientsRouter = Router();

clientsRouter
    .post('/', RetrievedDocuments) // ביחד, אמור להיות גט ולא פוסט
    .put('/:id', UpdateDocuments)
    .post('/login', login) // עידו  V
export default clientsRouter