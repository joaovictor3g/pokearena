import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));


app.listen(PORT);
