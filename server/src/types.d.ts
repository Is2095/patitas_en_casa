
export interface DatosUsuario {
    email: string
    contraseña: string
    nombre: string
    telefono: string
    fechaNacimiento: Date
}

export interface DatosConfirmacionEmail {
    email: string
    nombre: string
    cuerpo: string
    motivo: string
    remitente: string
    nameRemitente: string
}