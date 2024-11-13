import express, { Request, Response } from 'express';
import toolRoutes from './routes/toolRoutes';
import branchRoutes from './routes/branchRoutes';
import customerRoutes from './routes/customerRoutes';
import supplierRoutes from './routes/supplierRoutes';
import inventoryRoutes from './routes/inventoryRoutes';



const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api', toolRoutes);
app.use('/api', branchRoutes);
app.use('/api', customerRoutes);
app.use('/api', supplierRoutes);
app.use('/api', inventoryRoutes);


// A basic route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Express!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
