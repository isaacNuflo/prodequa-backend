const express = require('express');

let app = express();

let Empresa = require('../models/empresa');

app.get('/empresa', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Empresa.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, empresas) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                empresas
            });

        });

});

app.post('/empresa', (req, res) => {

    let body = req.body;

    let empresa = new Empresa({
        nombre: body.nombre,
        ruc: body.ruc,
        razon_social: body.razon_social,
        celular: body.celular,
        correo: body.correo,
        direccion: body.direccion,
        departamento: body.departamento,
        provincia: body.provincia,
        distrito: body.distrito,
        comentario: body.comentario
    });

    empresa.save((err, empresaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!empresaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'Empresa creada'
        });

    });

});

app.put('/empresa/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let empresa = {
        nombre: body.nombre,
        ruc: body.ruc,
        razon_social: body.razon_social,
        celular: body.celular,
        correo: body.correo,
        direccion: body.direccion,
        departamento: body.departamento,
        provincia: body.provincia,
        distrito: body.distrito,
        comentario: body.comentario
    }

    Empresa.findByIdAndUpdate(id, empresa, (err, empresaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!empresaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Empresa actualizada'
        });

    });

});

app.delete('/empresa/:id', (req, res) => {

    let id = req.params.id;
    Empresa.findByIdAndRemove(id, (err, empresaBorrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!empresaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Empresa no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Empresa borrada'
        });

    });

});

module.exports = app;