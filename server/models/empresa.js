const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let empresaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    ruc: {
        type: String,
        unique: true,
        minlength: 11,
        maxlength: 11,
        required: [true, 'El DNI es necesario']
    },
    razon_social: {
        type: String,
        required: [true, 'El DNI es necesario']
    },
    celular: {
        type: String,
        minlength: 9,
        maxlength: 9,
        required: [true, 'El celular es necesario']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
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

empresaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('Empresa', empresaSchema);