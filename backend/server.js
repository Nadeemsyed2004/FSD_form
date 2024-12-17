const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db/db.js');
const addEmp = require('./controllers/auth.js');

require('dotenv').config();
db();

app.use(cors({
  origin: 'https://fsd-form-nadeemsyed2004s-projects.vercel.app'
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("success");
});

app.use('/api/auth',addEmp);

const PORT = process.env.PORT;
app.listen(5000, () => {
    console.log(`Server Started at Port ${PORT}`);
});
