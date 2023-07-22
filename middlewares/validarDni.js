const {Estudiante} = require('../models/estudiantes');

//el dni tiene 8 digitos
const validarDni = async (req, res, next) => {
  const DNI = req.params.dni
  console.log('¿Entré al middleware?');

  if ((!isNaN(DNI)) && (DNI.length === 8)){  
    try {
      const busqueda = await Estudiante.findOne({dni: DNI}); 
      console.log('Estoy en el middleware');
      
      if (busqueda !== null) {
        next(); //esto es para que el dni vaya al controlador, del middleware salte al callback para continuar su peticion
      } else {
        res.status(401).json({
          msg: `El DNI ${DNI} es inválido`,
        });
      };    
    } catch (error) {
      res.status(401).json(error);
    };
  } else {
    console.log('No entré al middleware');
    res.status(401).json({
      msg: 'ERROR, el campo DNI tiene que tener 8 digitos y ser de tipo Number'
    });
  };
};

module.exports = { validarDni };