import * as yup from 'yup'
import { DatosUsuario } from '../types';

export const validacionDatosParaRegistrarUsuario: yup.ObjectSchema<DatosUsuario> = yup.object({
    nombre: yup
        .string()
        .trim()
        .required("El nombre es un campo requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(15, "El nombre no debe superar los 15 caracteres"),
    apellido: yup
        .string()
        .trim()
        .required("El apellido es un campo requerido")
        .min(3, "El apellido debe superar los 3 caracteres")
        .max(10, "El apellido no debe superar los 10 caracteres"),
    email: yup
        .string()
        .trim()
        .required("Se requiere un email")
        .email("El email no es válido"),
    contraseña: yup
        .string()
        .trim()
        .required("La contraseña es un campo requerido")
        .matches(/^(?=.*[a-z])/, "La contraseña debe tener al menos una minúscula")
        .matches(/^(?=.*[A-Z])/, "La contraseña debe tener al menos una mayúscula")
        .matches(/^(?=.*\d)/, "La contraseña debe tener al menos un número")
        .matches(/^(?=.*[@$!%*?&¡+#=])/, "La contraseña debe tener al menos una caracter especial")
        .matches(/^(?=.{8,})/, "La contraseña debe tener 8 caracteres"),
    telefono: yup
        .string()
        .required("El número de teléfono es requerido")
        .matches(/^(?:(?:\+?54?[-\s]?)?(?:9?[-\s]?)?)?(\d{3})(?:[-\s]?\d{7})$/, "debe ser un número de teléfono de Mendoza-Argentina"),
    confirmado: yup
        .boolean()
        .required("Posible ingreso indebido"),
    fechaNacimiento: yup
        .date()
        .required('La fecha de nacimiento es requerida')
        .max(new Date(), "La fecha no puede ser superior a la actual")
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 100)), "La edad no debe superar los 100 años")
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), "La edad debe superar los 18 años")
});
