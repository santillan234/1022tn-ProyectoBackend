//es para usar el string de conexion de MongoDB, que instale con mongoose
const mongoose = require('mongoose'); //es una libreria de mongo para poder utilizar toda la db
mongoose.set('strictQuery', false);
require('dotenv').config(); //con esto este archivo queda habilitado para usar environment

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN);
    console.log('Me conecté a la base de datos!');
  } catch {
    console.log('Error al conectarse con la base de datos');
  };
};

module.exports = {connect}; 
//esto es para app.js porque es el archivo que constantemente se esta ejecutando, se lee cada microsegundo.