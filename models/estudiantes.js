const {Schema, model} = require('mongoose');

const schema = new Schema ({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
    unique: true
  },
  sexo: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  celular: {
    type: Number,
    required: true,
  },
  secundario: {
    type: Boolean,
    required: true,
  },
  nota: {
    type: Number,
    required: true,
  }
});

const Estudiante = model('Estudiante', schema);
module.exports = { Estudiante };