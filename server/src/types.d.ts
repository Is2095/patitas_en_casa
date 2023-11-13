
export interface DatosUsuario {
    email: string
    password: string
    nombre: string
    telefono: number
    provider: string
    nivelAcceso: string
    imagen: string
    diaRegistro: string
}

export interface DatosConfirmacionEmail {
    email: string
    nombre: string
    cuerpo: string
    motivo: string
    remitente: string
    nameRemitente: string
}