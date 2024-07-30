import { Request, Response } from 'express';
import { client } from './client.type';
import { findByEmailAndPassword } from './client.model';


//בירור מצב חשבון-שליפת מסמכים
export async function RetrievedDocuments (req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "Documents Retrieved Successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}
//בירור מצב חשבון-עידכון מסמכים
export async function UpdateDocuments (req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "Documents Updated Successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}
export async function login(req: Request, res: Response) {
    try {

        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password must be provided' });
            return;
        }


        //route -> controller -> model -> db
        // מותר לגשת רק לפונקציות שבאות אחרי החץ של כל אחד!!!!!!!!
        // לדוגמה ראוט יכול לגשת רק לפונקציות של קונטרולר

        // Fetch all office workers
        const client: client = await findByEmailAndPassword(email, password); //await findAll(); 
        // const office_worker = allOfficeWorkers.find(
        //     (worker: officeWorker) => worker._id.toString() === _id
        // );

        // console.log('Found office worker:', office_worker); // Log the found office worker

        // Check if office worker exists and password matches
        if (client) {
            res.status(200).json({ msg: 'Client found!',client });
        } else {
            res.status(400).json({ msg: 'Invalid Email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}