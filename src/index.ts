import cors from 'cors';
import express from 'express';
import { router } from './routes/routes';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => console.log(`Server started on port ${port}`));
