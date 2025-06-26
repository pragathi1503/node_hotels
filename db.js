import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//const mongoURL= process.env.MONGODB_URL_LOCAL
const mongoURL= process.env.MONGODB_URL

mongoose.connect(mongoURL);
//    , {
//     useNewURLParser: true,
//     useUnifiedTopology: true,
//     ssl: true
// })

const db= mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server')
});

db.on('error', (err) => {
    console.log('MongoDB connection error: ', err)
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
});

// module.exports= db;
export default db;