import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from 'path'; //for deployment

import {connectDB} from './db/connectDB.js';

import authRoutes from './routes/auth.route.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); //for deployment


app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // to allow cookies to be sent
}));

app.use(express.json());// allows us to parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
app.use(cookieParser());//middleware to parse cookies from the HTTP Request 

app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get(/.*/, (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
} // for production


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});