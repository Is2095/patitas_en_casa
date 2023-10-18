
import * as yup from 'yup';

interface DatosRegistrar {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    passwordD: string;
}

export const validacionRegistrar: yup.ObjectSchema<DatosRegistrar> = yup.object({
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
    password: yup
        .string()
        .trim()
        .required("La contraseña es un campo requerido")
        .matches(/^(?=.*[a-z])/, "La contraseña debe tener al menos una minúscula")
        .matches(/^(?=.*[A-Z])/, "La contraseña debe tener al menos una mayúscula")
        .matches(/^(?=.*\d)/, "La contraseña debe tener al menos un número")
        .matches(/^(?=.*[@$!%*?&¡+#=])/, "La contraseña debe tener al menos una caracter especial")
        .matches(/^(?=.{8,})/, "La contraseña debe tener 8 caracteres"),
    passwordD: yup
        .string()
        .trim()
        .required("La contraseña es un campo requerido")
        .oneOf([yup.ref("password")], "La contraseña no coincide")
})