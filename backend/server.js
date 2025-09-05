require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const leadsRouter = require('./routes/leads');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/lead_db');

app.use('/api/leads', leadsRouter);

app.get('/', (req, res) => res.send('Lead API running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
