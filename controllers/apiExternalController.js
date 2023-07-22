//import axios from 'axios';
const axios = require('axios');

//https://rickandmortyapi.com/api/character
const apiExternalController = {
  async personajes (req, res) {
    try {
      const {data} = await axios.get('https://rickandmortyapi.com/api/character');
      res.status(200).json(data);      
    } catch (error) {
      res.status(500).json({error:'Ocurrió un error en el servidor.'});  
    };
  }
};

module.exports = apiExternalController;