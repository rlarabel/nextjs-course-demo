import { MongoClient } from "mongodb";

// /api/new-meetup

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;
        // const {title, image, address, description} = data;
        
        const client = await MongoClient.connect('mongodb+srv://Rams:w0pq7y80YBHxyi2P@cluster0.tdko0.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup insetered'});
    }
}; 

export default handler;