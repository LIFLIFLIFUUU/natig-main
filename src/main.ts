import 'dotenv/config'; // apply env vars
import express from 'express';
import clientsRouter from './clients/client.routes';
import officeWorkersRouter from './officeWorker/officeWorker.routes';
import workingHoursRouter from './collectionWorkingHours/collectionWorkingHours.routes';

//config
//process.env.PORT --> the live server port
const PORT = process.env.PORT || 9999; 

//create the server
const server = express();

//config JSON support
server.use(express.json());

//using routes
server.use('/api/clients', clientsRouter);
server.use('/api/officeWorkers', officeWorkersRouter);
server.use('/api/workingHours', workingHoursRouter);

//run the server
server.listen(PORT, () => console.log(`[Server] http://localhost:${PORT}`));