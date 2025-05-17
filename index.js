const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1', userRoutes);

sequelize.authenticate().then(() => {
  app.listen(8085, () => console.log('Server running on port 8085'));
});
