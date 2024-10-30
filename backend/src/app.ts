import express, { Request, Response } from 'express';
import toolRoutes from './routes/toolRoutes';


const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api', toolRoutes);

// A basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
