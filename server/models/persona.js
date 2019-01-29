const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let personaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    dni: {
        type: String,
        unique: true,
        minlength: 8,
        maxlength: 8,
        required: [true, 'El DNI es necesario']
    },
    correo: {
        type: String,
        required: [true, 'El correo es necesario']
    },
    celular: {
        type: String,
        unique: true,
        minlength: 9,
        maxlength: 9,
        required: [true, 'El celular es necesario']
    },
    direccion: {
        type: String,
        required: [true, 'El direccion es necesario']
    },
    departamento: {
        type: String,
        required: [true, 'El departamento es necesario']
    },
    provincia: {
        type: String,
        required: [true, 'El provincia es necesario']
    },
    distrito: {
        type: String,
        required: [true, 'El distrito es necesario']
    },
    comentario: {
        type: String,
        required: false
    }
});

personaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('Persona', personaSchema);