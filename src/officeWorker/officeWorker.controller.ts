import { Request, Response } from 'express';
import { deleteClientFromDb, findByPersonalIdAndPassword, getAll, getByEmail, getById, getWorkerById, insertClient, insertWorker, updateClientInDb} from './officeWorker.model';
import { findAll } from './officeWorker.db';
import { officeWorker } from './officeWorker.type';
import { ObjectId, WithId } from 'mongodb';
// TODO: insertCharacter, update 

export async function getAllClients(req: Request, res: Response) {
    try {
        let clients = await getAll();
        res.status(200).json({ clients });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getClientById(req: Request, res: Response) {
    try {
        let { id } = req.params;

        if (id.length != 24)
            return res.status(403).json({ message: 'invalid id' });

        let client_id = await getById(id);

        if (!client_id)
            res.status(404).json({ message: 'client not found' });
        else
            res.status(200).json({ client_id });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getOfficeWorkerById(req: Request, res: Response) {
    try {
        let { id } = req.params;

        if (id.length != 24)
            return res.status(403).json({ message: 'invalid id' });

        let worker_id = await getWorkerById(id);

        if (!worker_id)
            res.status(404).json({ message: 'client not found' });
        else
            res.status(200).json({ worker_id });
    } catch (error) {
        res.status(500).json({ error });
    }
}


export async function addClient(req: Request, res: Response) {
    try {
        let { client_name, client_type, address, mobile_number, income_tax_file, vat_file_number, email, password, home_number, documents } = req.body;
        
        if (!email)
            return res.status(400).json({ message: 'email is required' });

        // בדיקה אם הלקוח קיים לפי אימייל
        let existingClient = await getByEmail(email);
        if (existingClient) {
            return res.status(400).json({ message: 'Client with this email already exists' });
        }

        // הוספת לקוח חדש
        let result = await insertClient(client_name, client_type, address, mobile_number, income_tax_file, vat_file_number, email, password, home_number, documents);
        
        if (!result.acknowledged)
            res.status(500).json({ message: 'internal server error. please try again' });
        else
            res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function updateClient(req: Request, res: Response) {
    try {
        let { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'email is required' });
        }

        // בדיקה אם הלקוח קיים לפי אימייל
        let existingClient = await getByEmail(email);
        if (!existingClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // עדכון פרטי הלקוח
        let updatedClient = {
            _id: existingClient._id,
            client_name: req.body.client_name || existingClient.client_name,
            client_type: req.body.client_type || existingClient.client_type,
            address: req.body.address || existingClient.address,
            mobile_number: req.body.mobile_number || existingClient.mobile_number,
            income_tax_file: req.body.income_tax_file || existingClient.income_tax_file,
            vat_file_number: req.body.vat_file_number || existingClient.vat_file_number,
            email: existingClient.email,
            password: req.body.password || existingClient.password,
            home_number: req.body.home_number || existingClient.home_number,
            documents: req.body.documents || existingClient.documents
        };

        let result = await updateClientInDb(existingClient._id, updatedClient);

        if (result.modifiedCount === 0) {
            res.status(404).json({ message: 'Client not found' });
        } else {
            res.status(200).json({ result });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function deleteClient(req: Request, res: Response) {
    try {
        let { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(403).json({ message: 'invalid id' });
        }

        // בדיקה אם הלקוח קיים לפי id
        let existingClient = await getById(id);
        if (!existingClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        // מחיקת הלקוח
        let result = await deleteClientFromDb(existingClient._id);

        if (result.deletedCount === 0) {
            res.status(500).json({ message: 'Failed to delete client' });
        } else {
            res.status(200).json({ message: 'Client deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}
export async function login(req: Request, res: Response) {
    try {

        const { personal_id, password } = req.body;

        // Validate required fields
        if (!personal_id || !password) {
            res.status(400).json({ message: 'ID and password must be provided' });
            return;
        }


        //route -> controller -> model -> db
        // מותר לגשת רק לפונקציות שבאות אחרי החץ של כל אחד!!!!!!!!
        // לדוגמה ראוט יכול לגשת רק לפונקציות של קונטרולר

        // Fetch all office workers
        const officeWorker: officeWorker = await findByPersonalIdAndPassword(personal_id, password); //await findAll(); 
        // const office_worker = allOfficeWorkers.find(
        //     (worker: officeWorker) => worker._id.toString() === _id
        // );

        // console.log('Found office worker:', office_worker); // Log the found office worker

        // Check if office worker exists and password matches
        if (officeWorker) {
            res.status(200).json({ msg: 'Office worker found!',officeWorker });
        } else {
            res.status(400).json({ msg: 'Invalid ID or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export async function addWorker(req: Request, res: Response) {
    try {
        let { full_name, address, phone, home_phone, position, personal_id, start_date, email, password } = req.body;
        
        if (!email)
            return res.status(400).json({ message: 'email is required' });

        // בדיקה אם העובד קיים לפי אימייל
        let existingWorker = await getByEmail(email);
        if (existingWorker) {
            return res.status(400).json({ message: 'Worker with this email already exists' });
        }

        // הוספת עובד חדש
        let result = await insertWorker(full_name, address, phone, home_phone, position, personal_id, start_date, email, password);
        
        if (!result.acknowledged)
            res.status(500).json({ message: 'internal server error. please try again' });
        else
            res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error });
    }
}