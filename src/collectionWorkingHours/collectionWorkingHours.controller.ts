import { Request, Response } from 'express';
import { getClientHoursByWorkerId, getWorkerHoursByWorkerId, insertHours, updateHours } from './collectionWorkingHours.model';
import { ObjectId } from 'mongodb';

export async function addHours(req: Request, res: Response) {
    try {
        const { worker_id, client_id, day_of_work, start_hour, end_hour } = req.body;

        if (!worker_id || !client_id || !day_of_work || !start_hour || !end_hour) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newHours = {
            worker_id: new ObjectId(worker_id),
            client_id: new ObjectId(client_id),
            day_of_work: new Date(day_of_work),
            start_hour: new Date(start_hour),
            end_hour: new Date(end_hour)
        };

        const result = await insertHours(newHours);
        if (result.acknowledged) {
            res.status(201).json({ message: 'Working hours added successfully', id: result.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to add working hours' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: errorMessage });
    }
}

export async function changeHours(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { worker_id, client_id, day_of_work, start_hour, end_hour } = req.body;

        console.log(`Received ID: ${id}`);
        console.log(`Is valid ObjectId: ${ObjectId.isValid(id)}`);
        
        if (id.length != 24)
            return res.status(403).json({ message: 'invalid id' });

        const updatedHours: any = {};

        if (worker_id) updatedHours.worker_id = new ObjectId(worker_id);
        if (client_id) updatedHours.client_id = new ObjectId(client_id);
        if (day_of_work) updatedHours.day_of_work = new Date(day_of_work);
        if (start_hour) updatedHours.start_hour = new Date(start_hour);
        if (end_hour) updatedHours.end_hour = new Date(end_hour);

        console.log(`Updating hours with id: ${id}`);
        console.log('Updated hours:', updatedHours);

        const result = await updateHours(id, updatedHours);
        console.log('Update result:', result);

        if (result.matchedCount === 0) {
            console.log('404 - Working hours not found');
            return res.status(404).json({ message: 'Working hours not found' });
        }
        
        if (result.modifiedCount > 0) {
            console.log('200 - Working hours updated successfully');
            return res.status(200).json({ message: 'Working hours updated successfully' });
        } else if (result.matchedCount > 0 && result.modifiedCount === 0) {
            console.log('304 - No changes made to the working hours');
            return res.status(304).json({ message: 'No changes made to the working hours' });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.log('500 - Internal Server Error:', errorMessage);
        res.status(500).json({ error: errorMessage });
    }
}
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

export async function getClientHours(req: Request, res: Response) {
    try {
        let { client_id } = req.params;
        
        if (client_id.length != 24)
            return res.status(403).json({ message: 'invalid id' });
        
        console.log(client_id);

        let client_hours = await getClientHoursByWorkerId(client_id);

        if (!client_hours)
            res.status(404).json({ message: 'Worker hours not found' });
        else
            res.status(200).json({ client_hours });
    } catch (error) {
        res.status(500).json({ error });
    }
}