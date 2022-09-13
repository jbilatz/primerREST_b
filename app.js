/*
datos que tomamos del proceso de confirguración de la base de datos online MongoDB Altas
*/
// mongodb+srv://<user>:<password>@cluster0.schfn.mongodb.net/?retryWrites=true&w=majority


const express = require('express');
const mongoose = require('mongoose');

/*
usa el método .conect() de Mongoose
para conectarse a nuestra base de datos online MongoDB Altas,
pasándole como parámetro el string que nos dió la misma cuando la configuramos,
al elegir el método de conexión. Ese método .conect() devuelve una Promesa/Promise
que resolvemos con la función .then() (... y .catch() para los posibles errores)
*/
mongoose.connect('mongodb+srv://<user>:<password>@cluster0.schfn.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Conectados a MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('FALLA al conectarse a MongoDB Atlas!');
    console.error(error);
  });
  const Meeting = require('./models/meeting');

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
  

/*
middleware para pedir los datos de una determinada reunión
*/
app.get('/api/v1/meetings/:id', (req, res, next) => {
  Meeting.findOne({
    _id: req.params.id
  }).then(
    (meeting) => {
      res.status(200).json(meeting);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

/*
middleware para modificar los datos de una determinada reunión
*/
app.put('/api/v1/meetings/:id', (req, res, next) => {
  const meeting = new Meeting({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    time: req.body.time,
    userId: req.body.userId
});
  Meeting.updateOne({_id: req.params.id}, meeting).then(
    () => {
      res.status(201).json({
        message: 'Reunión Actualizada!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

/*
middleware para borrar el registro de una determinada reunión
*/
app.delete('/api/v1/meetings/:id', (req, res, next) => {
  Meeting.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Borrada!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});


/*
middleware para registrar una reunión nueva
*/
app.post('/api/v1/meetings', (req, res, next) => {
    const meeting = new Meeting({
      title: req.body.title,
      description: req.body.description,
      time: req.body.time,
      userId: req.body.userId
    });
    meeting.save().then(
      () => {
        res.status(201).json({
            message: 'Reunion guardada!',
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


/*
middleware para pedir el listado de todas las reuniones
*/
  app.get('/api/v1/meetings', (req, res, next) => {
    Meeting.find().then(
      (meetings) => {
        res.status(200).json(meetings);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


module.exports = app;

