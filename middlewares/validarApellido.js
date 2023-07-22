const {Estudiante} = require('../models/estudiantes');

const validarApellido = async (req, res, next) => {
  const APELLIDO = req.params.apellido
  console.log('¿Entré al middleware?');

  if (isNaN(APELLIDO)) {
    try {
      const regex = new RegExp(APELLIDO, 'i');
      const list = await Estudiante.findOne({apellido: regex}); 
      console.log('Estoy en el middleware');

      if (list !== null) {
        next();
      } else {
        res.status(401).json({
          msg: `El apellido ${APELLIDO} es inválido`,
        });
      };    
    } catch (error) {
      res.status(401).json(error);
    };    
  } else {
    console.log('No entré al middleware');
    res.status(401).json({
      msg: 'ERROR, el campo apellido solo admite datos de tipo String'
    });
  };
};

module.exports = { validarApellido };