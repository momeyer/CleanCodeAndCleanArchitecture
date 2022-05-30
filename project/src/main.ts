import express, { Request, Response } from "express";
const router = express()
const port = 3000;

router.get('/', (req: Request, res: Response): void => {
    res.status(200).send('Hello World!');
})

router.get('/hello', (req: Request, res: Response): void => {
    console.log("This is the headers: ", req.headers);
    console.log("This is the header: ", req.header);
    res.status(200).send({ hello: "hey" });
})

router.listen(port, (): void => {
    console.log(`Example router listening on port ${port}`);
})