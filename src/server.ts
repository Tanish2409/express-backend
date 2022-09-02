import type { Application, Request, Response } from 'express';
import express from 'express';

// App config
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT ?? 4000;

app.use('/', (_: Request, res: Response) => {
	res.status(200).json({ data: 'Hello World' });
});

// Start server
app.listen(port, () => {
	console.log(`Server is listening on port ${port}!`);
});
