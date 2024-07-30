import 'dotenv/config'; // apply env vars
import express from 'express';
import clientsRouter from './clients/client.routes';
import officeWorkersRouter from './officeWorker/officeWorker.routes';
import workingHoursRouter from './collectionWorkingHours/collectionWorkingHours.routes';
import {engine} from 'express-handlebars';
import path from 'path';
import viewRouter from './views/views.routes';

//config
//process.env.PORT --> the live server port
const PORT = process.env.PORT || 9999; 

//create the server
const server = express();

//config JSON support
server.use(express.json());

// Middleware to parse URL-encoded bodies
server.use(express.urlencoded({ extended: true }));

//views
server.engine('.hbs', engine({extname: '.hbs'}));
server.set('view engine', '.hbs');
server.set('views', path.join(__dirname, 'views/'));

//static files
server.use('/static', express.static(path.join(__dirname, 'static/')));


//using routes
server.use('/', viewRouter);
server.use('/api/clients', clientsRouter);
server.use('/api/officeWorkers', officeWorkersRouter);
server.use('/api/workingHours', workingHoursRouter);

//run the server
server.listen(PORT, () => console.log(`[Server] http://localhost:${PORT}`));