const app = require('./app');
require('dotenv').config();

//es para que siempre si o si se conecte a un puerto, o es el PORT o es 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});