const express = require('express');
const app = express();

app.use(express.json())


app.use((req, res, next) => {
    console.log('Solicitud recibida!');
    next();
  });
  
  
  
  app.use((req, res, next) => {
    console.log('Respuesta enviada con éxito!');
    next();
  });
  


app.get('/api/v1/meetings', (req, res, next) => {
    const meetings = [
      {
        titulo: 'Reunión 01',
        descripción: 'Presentacion',
        hora: '01-09-2021 18:00',
        usuarioId: 'rgse78ctq8gt387g',
      },
      {
        titulo: 'Reunión 02',
        descripción: 'Clase 04',
        hora: '08-09-2021 18:00',
        usuarioId: 'rgse78ctq8gt387g',
  
      },
    ];
    res.status(404).json(meetings);
    next();
  });
  


app.get('/api/v1/meetings/:id', (req, res) => {
    const id = req.params.id;
    res.end('Reunión ' + id);
});

app.delete('/api/v1/meetings/:id', (req, res) => {
    const id = req.params.id;
    res.end('Reunion ' + id + ' ELIMINADA!');
});


app.post('/api/v1/meetings', (req, res) => {
    const datosReunion = req.body; // los datos de la reunión que recibimos
    console.log(datosReunion); 
    res.status(201).json({
        message: 'Reunion creada!',
        datosReunion
    });
});



module.exports = app;

