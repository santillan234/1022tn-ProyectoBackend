//esta funcion valida cualquier tipo de checks, solo que lo tengo que poner adelante al checks como primer middleware

const {validationResult} = require('express-validator');

const validarChecks = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) { //si la constante error esta vacia, significa que no hubo ningun error, y si tiene cargado algo adentro es porque encontro algo
  next();
  } else {
    res.status(400).json(err); //devuelvo la constante err con el eror o errores que hubo en la validacion
  };
};

module.exports = {validarChecks};