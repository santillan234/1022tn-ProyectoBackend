const {Estudiante} = require('../models/estudiantes');
const validator = require('validator');

const validarEmail = async (req, res, next) => {
  const EMAIL = req.params.email
  console.log('¿Entré al middleware?');

  if (validator.isEmail(EMAIL)) {
    try {
      const busqueda = await Estudiante.findOne({email: EMAIL}); 
      console.log('Estoy en el middleware');

      if (busqueda !== null) {
        next(); //esto es para que el email vaya al controlador, del middleware salte al callback para continuar su peticion
      } else {
        res.status(401).json({
          msg: `El email ${EMAIL} es inválido`,
        });
      };    
    } catch (error) {
      res.status(401).json(error);
    };    
  } else {
    console.log('No entré al middleware');
    res.status(401).json({
      msg: 'ERROR, el campo email solo admite datos de tipo email'
    });
  };
};

module.exports = { validarEmail };