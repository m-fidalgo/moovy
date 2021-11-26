import express from 'express';
import cors from 'cors';
import routes from './routes';
import './database/connection';

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port);
