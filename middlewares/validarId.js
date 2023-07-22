const {Estudiante} = require('../models/estudiantes');

//el id tiene 24 digitos
const validarId = async (req, res, next) => {
  ID = req.params.id
  console.log('¿Entré al middleware?');

  if (ID.length === 24){  
    try {
      const busqueda = await Estudiante.findById(ID); 
      console.log('Estoy en el middleware');

      if (busqueda !== null) {
        next(); //esto es para que el id vaya al controlador, del middleware salte al callback para continuar su peticion
      } else {
        res.status(401).json({
          msg: `El id ${ID} es inválido`,
        });
      };      
    } catch (error) {
      res.status(401).json(error);
    };
  } else {
    console.log('No entré al middleware');
    res.status(401).json({
      msg: 'ERROR, el campo id tiene que tener 24 digitos'
    });
  };
};

module.exports = { validarId };