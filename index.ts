import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import Redis from 'ioredis';
import routes from './routes/routes';

const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'projectTwo';

const app = express();
app.use(cors());
dotenv.config();

const port = Number(process.env.SERVER_PORT);
const secretKey = '%$@60987~672?@4';

let collection_accounts:any;
let collection_mail:any;
let collection_news:any;
let collection_roles:any;
let collection_requests:any;
let db:any;

app.use(express.json());
app.use('/', routes);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-jwt-token');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const redis = new Redis();

async function connectDB() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        db = client.db(DB_NAME);
        collection_accounts = db.collection('accounts');
        collection_mail = db.collection('mail');
        collection_news = db.collection('news');
        collection_roles = db.collection('roles');
        collection_requests = db.collection('requests')
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectDB();

export { collection_accounts, collection_mail, collection_news, collection_roles, collection_requests, db, secretKey, redis};
