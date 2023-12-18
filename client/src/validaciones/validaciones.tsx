
import * as yup from 'yup';

interface DatosRegistrar {
    nombre: string;
    apellido: string;
    email: string;
    //contraseña: string;
    contraseñaD: string;
};
interface DatosConfirmar {
    nombre: string;
    email: string;
};
interface DatosIngresar {
    email: string;
    contraseña: string;
};
interface Telefono {
    telefono: string
};
interface Contraseña {
    contraseña: string
};

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
    contraseña: yup
        .string()
        .trim()
        .required("La contraseña es un campo requerido")
        .matches(/^(?=.*[a-z])/, "La contraseña debe tener al menos una minúscula")
        .matches(/^(?=.*[A-Z])/, "La contraseña debe tener al menos una mayúscula")
        .matches(/^(?=.*\d)/, "La contraseña debe tener al menos un número")
        .matches(/^(?=.*[@$!%*?&¡+#=])/, "La contraseña debe tener al menos una caracter especial")
        .matches(/^(?=.{8,})/, "La contraseña debe tener 8 caracteres"),
    contraseñaD: yup
        .string()
        .trim()
        .required("Se requiere repetir la contraseña")
        .oneOf([yup.ref("contraseña")], "La contraseña no coincide"),
    telefono: yup
        .string()
        .required("El número de teléfono es requerido")
        .matches(/^(?:(?:\+?54?[-\s]?)?(?:9?[-\s]?)?)?(\d{3})(?:[-\s]?\d{7})$/, "debe ser un número de teléfono de Mendoza-Argentina")

});
export const validacionConfirmar: yup.ObjectSchema<DatosConfirmar> = yup.object({
    nombre: yup
        .string()
        .trim()
        .required("El nombre es un campo requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(15, "El nombre no debe superar los 15 caracteres"),
    email: yup
        .string()
        .trim()
        .required("Se requiere un email")
        .email("El email no es válido")
});
export const validacionIngresar: yup.ObjectSchema<DatosIngresar> = yup.object({
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
        .matches(/^(?=.{8,})/, "La contraseña debe tener 8 caracteres")
});
export const validacionTelefono: yup.ObjectSchema<Telefono> = yup.object({
    telefono: yup
        .string()
        .required("El número de teléfono es requerido")
        .matches(/^(?:(?:\+?54?[-\s]?)?(?:9?[-\s]?)?)?(\d{3})(?:[-\s]?\d{7})$/, "debe ser un número de teléfono de Mendoza-Argentina")
});
export const validacionContraseña: yup.ObjectSchema<Contraseña> = yup.object({
    contraseña: yup
        .string()
        .trim()
        .required("La contraseña es un campo requerido")
        .matches(/^(?=.*[a-z])/, "La contraseña debe tener al menos una minúscula")
        .matches(/^(?=.*[A-Z])/, "La contraseña debe tener al menos una mayúscula")
        .matches(/^(?=.*\d)/, "La contraseña debe tener al menos un número")
        .matches(/^(?=.*[@$!%*?&¡+#=])/, "La contraseña debe tener al menos una caracter especial")
        .matches(/^(?=.{8,})/, "La contraseña debe tener 8 caracteres"),
    contraseñaD: yup
        .string()
        .trim()
        .required("Se requiere repetir la contraseña")
        .oneOf([yup.ref("contraseña")], "La contraseña no coincide"),
});