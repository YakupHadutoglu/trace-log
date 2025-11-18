import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response): void => {
    res.send("MERHABA DUNYA");
});

export default app;
