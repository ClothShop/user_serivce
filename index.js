
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/user.routes');
const authMiddleware = require('./middleware/validateDto');

app.use(express.json());
app.use(authMiddleware);
app.use('/users', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on port 3000'));
});
