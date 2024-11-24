const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./config');
const hotelRoutes = require('./routes/hotelRoutes');
const cors = require ('cors');
dotenv.config();

const app = express();

app.use(express.json());

 app.use(cors({
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})) 


app.use('/api/hotels', hotelRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      'Connection to the database has been established successfully.'
    );
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

const PORT = process.env.DB_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);
