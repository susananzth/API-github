var express = require('express');
var router = express.Router();

// Leer un JSOM, se importa el filesystem
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Leer el archivo JSON
  fs.readFile('./public/json/libros.json' , (error, datos)=>{
    if (error) {
      // Muestra mensaje o plantilla en caso de error al leer el JSON
      res.send("error de lectura");
    }else{
      // Importa la plantilla por defecto de express con los datos del JSON
      res.render('index', { datos: JSON.parse(datos) } );
    }

  })
});

module.exports = router;
