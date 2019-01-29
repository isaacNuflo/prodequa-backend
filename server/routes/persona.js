const express = require('express');

let app = express();

let Persona = require('../models/persona');

app.get('/persona', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Persona.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, personas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                personas
            });

        });

});

app.post('/persona', (req, res) => {

    let body = req.body;

    let persona = new Persona({
        nombre: body.nombre,
        dni: body.dni,
        celular: body.celular,
        correo: body.correo,
        direccion: body.direccion,
        departamento: body.departamento,
        provincia: body.provincia,
        distrito: body.distrito,
        comentario: body.comentario
    });

    persona.save((err, personaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'Persona creada'
        });

    });

});

app.put('/persona/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let persona = {
        nombre: body.nombre,
        dni: body.dni,
        celular: body.celular,
        correo: body.correo,
        direccion: body.direccion,
        departamento: body.departamento,
        provincia: body.provincia,
        distrito: body.distrito,
        comentario: body.comentario
    }

    Persona.findByIdAndUpdate(id, persona, (err, personaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!personaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Persona actualizada'
        });

    });

});

app.delete('/persona/:id', (req, res) => {

    let id = req.params.id;
    Persona.findByIdAndRemove(id, (err, personaBorrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!personaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Persona no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Persona borrada'
        });

    });

});

module.exports = app;