import express from 'express';
import cors from 'cors';
import slotRouter from './Slots/slot.routes';

const app = express();
app.use(express.json());
app.use(cors());

async function startServer() {
    try {
        // Тут бы я мог подключиться

        app.use(slotRouter);
        app.listen(3005, () => {
            console.log('Server started');
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

startServer();
