const Meeting = require('../models/meeting');

exports.crearReunion = (req, res) => {
    const meeting = new Meeting({
        title: req.body.title,
        decription: req.body.decription,
        time: req.body.time,
        userId: req.body.userId
    });
    meeting.save().then(
        () => {
            res.status(201).json({
                message: 'Reunion creada!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.datosUnaReunion = (req, res) => {
    Meeting.findOne({
        _id: req.params.id

    }).then(
        (meeting) => {
            res.status(200).json(meeting);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.listadoDeReuniones = (req, res) => {
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
}

exports.modificarReunion = (req, res) => {
    const meeting = new Meeting({
        _id: req.params.id,
        title: req.body.title,
        decription: req.body.decription,
        time: req.body.time,
        userId: req.body.userId
    });
    Meeting.updateOne({_id: req.params.id}, meeting).then(
        () => {
            res.status(200).json({
                message: 'Reunion actualizada!'

            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}


exports.borrarReunion = (req, res) => {
    Meeting.deleteOne({
        _id: req.params.id

    }).then(
        () => {
            res.status(200).json({
                message: 'Reunion ELIMINADA!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}