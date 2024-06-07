import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async (req, res) => {
    console.log('Received request:', req.method);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        console.log('Request Body:', req.body);
        console.log('API Key:', process.env.API_KEY);

        const response = await fetch('https://api2.pickaflat.com/v1/availabilities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        console.log('API response data:', data);
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).send('Erreur du serveur');
    }
};
