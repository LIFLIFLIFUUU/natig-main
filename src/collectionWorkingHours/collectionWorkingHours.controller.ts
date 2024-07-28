import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { getWorkerHoursByWorkerId } from './collectionWorkingHours.model';

export async function getWorkerHours(req: Request, res: Response) {
    try {
        let { worker_id } = req.params;
        
        if (worker_id.length != 24)
            return res.status(403).json({ message: 'invalid id' });
        
        console.log(worker_id);

        let worker_hours = await getWorkerHoursByWorkerId(worker_id);

        if (!worker_hours)
            res.status(404).json({ message: 'Worker hours not found' });
        else
            res.status(200).json({ worker_hours });
    } catch (error) {
        res.status(500).json({ error });
    }
}