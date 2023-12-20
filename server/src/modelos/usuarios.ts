
import { Schema, model, Document } from "mongoose";
import moment from 'moment';

interface Usuario extends Document {
    email: string;
    contraseña: string;
    nombre: string;
    telefono: string;
    fechaNacimiento: Date;
    provider: string;
    //favoritos: Animal[];
    nivelAcceso: string;
    imagen: string;
    diaRegistro: string;
}

const usuarioSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "El email es requerido (DB)"],
        match: [
            /^[a-z0-9._%+-]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
            "Email no es válido (DB)"
        ]
    },
    contraseña: {
        type: String,
        required: [true, "El password es requerido (DB)"],
        default: 'aA1=aaaa',
        select: false
    },
    nombre: {
        type: String,
        requered: [true, "El nombre es requerido (DB)"],
        minLength: [3, "El nombre requiere más de 3 caracteres"],
        maxLength: [20, "El nombre devbe tener menos de 20 caracteres"]
    },
    telefono: {
        type: String,
        requered: [true, "Debe ingresar un n° de teléfono de contacto"],
        match: [
            /^(?:(?:\+?54?[-\s]?)?(?:9?[-\s]?)?)?(\d{3})(?:[-\s]?\d{7})$/,
            "Número de teléfono no válido"
        ],
        default: 542610000000
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida'],
        validate: {
            validator: function(v: Date) {
                const edad = moment().diff(moment(v), 'years');
                return edad >= 18 && edad<=100;
            },
            message: (props: any) => `${props.value} es una edad inválida`
        }
    },
    provider: {
        type: String,
        required: false,
        default: "local"
    },
    // favoritos: {
    //     type: Array, 
    //     default: [],
    // },
    nivelAcceso: {
        
        type: String,
        requered: true,
        default: '1'
    },
    imagen: {
        type: String,
        required: false,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX-BH0rwTlqY-_4BGCB_EYWt0vkOJkI8aBDQ&usqp=CAU"
    },
    diaRegistro: {
        type: String,
        required: false,
        default: Date(),
    }
});

export default model<Usuario>("Usuario", usuarioSchema, "usuario")