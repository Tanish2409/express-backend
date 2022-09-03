require('module-alias/register');

import type { Application } from 'express';
import express from 'express';
import morgan from 'morgan';
import mainRouter from '@/routes/main.routes';

// App config
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// PORT
const port = process.env.PORT ?? 4000;

// Routes
app.use('/api', mainRouter);

// Start server
if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}!`);
	});
}

export default app;
