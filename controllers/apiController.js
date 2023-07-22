const {Estudiante} = require('../models/estudiantes');
require('dotenv').config();

const apiController = {
  async crear(req, res){
    try {
      const newAlumno = new Estudiante(req.body);
      await newAlumno.save();

      console.log({ msg: 'save', newAlumno });
      res.status(201).json(`El estudiante ${req.body.nombre} ${req.body.apellido} ha sido ingresado con exito!`);          
    } catch (error) {
      status500(res);
    };
  },

  async info(req, res){
    try {
      const list = await Estudiante.find(); //me devuelve toda la info de la coleccion
      
      encontrar(list, res);        
    } catch (error) {
      status500(res);
    };
  },

  async estadisticas(req, res){
    try {
      const estudiantes = await Estudiante.find();

      if(estudiantes.length > 0){
        const cantidadEstudiantes = estudiantes.length;
        const sumaNotas = estudiantes.reduce((total, estudiante) => total + estudiante.nota, 0); // total es el acumulador, estudiante es el valor actual, 0 es la posicion en la que comienza el valor actual
        const sumaEdades = estudiantes.reduce((total, estudiante) => total + estudiante.edad, 0);
        const promedioNotas = sumaNotas / cantidadEstudiantes;
        const promedioEdades = sumaEdades / cantidadEstudiantes;

        const estudiantesAprobados = estudiantes.filter(estudiante => estudiante.secundario); //es lo mismo que estudiante.secundario == true
        const secundarioAprobado = estudiantesAprobados.length;
        const secundarioDesaprobado = cantidadEstudiantes - secundarioAprobado;

        const cantidad = cantidadEstudiantes === 1 ? `Hasta el momento se ha ingresado ${estudiantes.length} estudiante` : `Hasta el momento se han ingresado ${estudiantes.length} estudiantes`;
        
        res.status(200).json({
          cantidad,
          promedioNotaGral: `El promedio general de las notas de todos los estudiantes del curso es de ${promedioNotas.toFixed(2)}`,
          promedioEdadGral: `El promedio general de las edades de todos los estudiantes del curso es de ${promedioEdades.toFixed(2)}`,
          secundarioAprobado: `Del total de los estudiantes inscriptos en el curso, ${secundarioAprobado} terminaron el secundario`,
          secundarioDesaprobado: `Del total de los estudiantes inscriptos en el curso, ${secundarioDesaprobado} no terminaron el secundario`
        });
      } else {
        res.status(404).json({ error: "No se encontraron estudiantes en la base de datos." });
      };
    } catch (error) {
      status500(res);            
    };
  },

  async buscarPorId (req, res){
    try {
      console.log('Estoy en el controlador');
      const busqueda = await Estudiante.findById(req.params.id);

      res.status(200).json(busqueda);        
    } catch (error) {
      status500(res);
    };
  },

  async buscarPorDni (req, res){
    try {
      const busqueda = await Estudiante.findOne({dni: req.params.dni}); //si hay muchos con esa propiedad me trae el que primero se creo, eso funciona bien cuando esta la propiedad unique en schema
      
      res.status(200).json(busqueda);        
    } catch (error) {
      status500(res);      
    };
  },

  async buscarPorEmail (req, res){
    try {
      const busqueda = await Estudiante.findOne({email: req.params.email}); //.findOne Me da un objeto, no un array
      
      res.status(200).json(busqueda);        
    } catch (error) {
      status500(res);      
    };
  },

  async buscarPorApellido (req, res){
    try {
      const regex = new RegExp(req.params.apellido, 'i');
      const list = await Estudiante.find({apellido: regex}); //.find Me da un array de objetos 
      
      encontrar(list, res, `Si el apellido es ${req.params.apellido}`);
    } catch (error) {
      status500(res);
    };
  },

  async buscarPorNombre (req, res){
    try {
      const regex = new RegExp(req.params.nombre, 'i'); //Utilizamos una expresion regular, con la opcion 'i' la busqueda no es sensible a mayusculas y minusculas. Una expresión regular es una secuencia de caracteres que define un patrón de búsqueda. Se utilizan para realizar coincidencias y manipulaciones avanzadas en cadenas de texto.
      const list = await Estudiante.find({nombre: regex}); //se utiliza la expresion de arriba en la consulta a la coleccion de alumnos. Esto devuelve todo los alumnos cuyo nombre contenga la cadena proporcionada, ya sea parcialmente o en su totalidad

      encontrar(list, res, `Si el nombre es ${req.params.nombre}`);
    } catch (error) {
      status500(res);            
    };
  },

  async buscarPorQuery (req, res){
    try {
      const list = await Estudiante.find(req.query); 

      encontrar(list, res);    
    } catch (error) {
      status500(res);                  
    };
  },

  async buscarPorAprobados(req, res) {
    try {
      const notaMinAprobado = process.env.NOTA_APROBAR;
      const list = await Estudiante.find({ nota: { $gte: notaMinAprobado } }).sort({ nota: 1 });

      encontrar(list, res, `Sabiendo que la nota minima para aprobar es de ${notaMinAprobado}`);
    } catch (error) {
      status500(res);      
    };
  },

  async editar(req, res){
    try {
      await Estudiante.findByIdAndUpdate(req.params.id, req.body); //por parametro envio el id y por body el objeto y lo actualizo
      const busqueda = await Estudiante.findById(req.params.id); //el id que estamos enviando, luego de modificar en la linea de arriba, en esta linea lo vuelve a buscar pero ya modificado

      res.status(200).json({
        msg: 'Se actualizaron los datos del estudiante',
        busqueda
      });
    } catch (error) {
      status500(res); 
    };
  },

  async eliminar(req, res){
    try {
      await Estudiante.findByIdAndDelete(req.params.id)

      res.status(204).json() //204 no devuelve ningun contenido, es como un 200 pero el cual no tiene un objeto de respuesta
    } catch (error) {
      status500(res);
    };
  }
};

function encontrar(list, res, mensaje){
  let resultado = '';
  
  switch (list.length){
    case 0:
      resultado = res.status(404).json({
      mensaje,
      msg: `No se han encontrado estudiantes`
      });
    break; 
    case 1:
      resultado = res.status(200).json({
        mensaje, 
        msg: `Se ha encontrado ${list.length} estudiante`,
        estudiante: list
      });
    break;
    default:
      resultado = res.status(200).json({
        mensaje, 
        msg: `Se han encontrado ${list.length} estudiantes`,
        estudiantes: list 
      });
    break;
  };

  return resultado;
};

function status500(res){
  return res.status(500).json({error: 'Ocurrió un error en el servidor.'});
};

module.exports = apiController;