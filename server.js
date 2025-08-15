const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API running...'));

// Routes
app.use('/api/goals', require('./routes/api/goalRoutes'));
app.use('/api/users', require('./routes/api/userRoutes'));
const { errorHandler } = require('./middleware/errorMiddleware');

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


