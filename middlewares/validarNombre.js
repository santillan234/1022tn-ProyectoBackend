const {Estudiante} = require('../models/estudiantes');

const validarNombre = async (req, res, next) => {
  const NOMBRE = req.params.nombre
  console.log('¿Entré al middleware?');

  if (isNaN(NOMBRE)) {
    try {
      const regex = new RegExp(NOMBRE, 'i');
      const list = await Estudiante.findOne({nombre: regex}); 
      console.log('Estoy en el middleware');

      if (list !== null) {
        next();
      } else {
        res.status(401).json({
          msg: `El nombre ${NOMBRE} es inválido`,
        });
      };    
    } catch (error) {
      res.status(401).json(error);
    };    
  } else {
    console.log('No entré al middleware');
    res.status(401).json({
      msg: 'ERROR, el campo nombre solo admite datos de tipo String'
    });
  };
};

module.exports = { validarNombre };