import express from 'express';
import './database/connection';

const port = 3333;
const app = express();

app.use(express.json());

app.listen(port);
