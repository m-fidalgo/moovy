import express from 'express';
import cors from 'cors';
import './database/connection';
import routes from './routes';

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);
