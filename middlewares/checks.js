const {check} = require('express-validator'); //check nos permite validar campos
require('dotenv').config();

const checks =  [
  check('nombre')
    .notEmpty().withMessage('El campo nombre es requerido')
    .isString().withMessage('El campo nombre tiene que ser de tipo string'),
  check('apellido')
    .notEmpty().withMessage('El campo apellido es requerido')
    .isString().withMessage('El campo apellido tiene que ser de tipo string'),
  check('edad')
    .notEmpty().withMessage('El campo edad es requerido')
    .isInt({ min: process.env.EDAD_MINIMA}).withMessage('El campo edad tiene que ser de tipo Entero y debe ser mayor o igual a 18'),
  check('dni')
    .notEmpty().withMessage('El campo dni es requerido')
    .isInt({ min: 1}).withMessage('El campo dni tiene que ser de tipo Entero')
    .isLength({ min: process.env.NUM_DIGITOS_DNI, max: process.env.NUM_DIGITOS_DNI}).withMessage('El campo DNI debe contener exactamente 8 números'),
  check('email')
    .notEmpty().withMessage('El campo email es requerido')
    .isEmail().withMessage('El campo email tiene que ser de tipo email'),
  check('celular')
    .notEmpty().withMessage('El campo celular es requerido')
    .isInt({ min: 1}).withMessage('El campo celular tiene que ser de tipo Entero')
    .isLength({ min: process.env.NUM_DIGITOS_CELULAR, max: process.env.NUM_DIGITOS_CELULAR}).withMessage('El campo celular debe contener exactamente 10 números')
    .custom((value) => {
      const primeroDosDigitos = value.toString().slice(0,2);
      if ( primeroDosDigitos !== '11') {
        throw new Error('El campo celular debe comenzar con 11, que es la característica de Bs As')
      } else {
        return true;
      }
    }), 
  check('secundario')
    .notEmpty().withMessage('El campo secundario es requerido')
    .isBoolean().withMessage('El campo secundario tiene que ser de tipo booleano, true o false según corresponda'),
  check('nota')
    .notEmpty().withMessage('El campo nota es requerido')
    .isNumeric().withMessage('El campo nota tiene que ser de tipo number')
    .custom((value) => {
      if ((value < process.env.NOTA_MINIMA) || (value > process.env.NOTA_MAXIMA) ) {
        throw new Error('El campo nota tiene que estar comprendido entre 0 y 10');
      } else {
        return true;
      };
    }),
];

module.exports = checks;