
import express from "express";
import serverless from "serverless-http"
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'
const app = express();

dotenv.config()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

//Middlewere

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

//Routes
app.use('/api/posts',postRoute)
app.use('/api/auth',authRoute)
app.use('/api/comments',commentRoute)


async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.icqmrjw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
      );
    app.listen(PORT, () => {
      console.log(`Server started  on port:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
export default serverless(app)