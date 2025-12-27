const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');

const app = express();


app.use(cors());
app.use(express.json()); // ⭐ IMPORTANT


mongoose.connect('mongodb://localhost:27017/userDataBase')
  .then(() => console.log('Database is Connected'))
  .catch(() => console.log('Database is not connected'));

app.use('/api', userRoute);

app.listen(5000, () => {
  console.log("Server is Running");
});
