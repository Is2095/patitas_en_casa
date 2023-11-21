
import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';

type Resultado = SentMessageInfo | {error: unknown};

const EnvioCodigoConfirmacion = async ({ email, nombre, cuerpo, motivo, remitente, nameRemitente }: { email: string, nombre: string, cuerpo: string, motivo: string, remitente: string, nameRemitente: string }): Promise<Resultado> => {

    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NODEMAILER_USER,
            pass: process.env.EMAIL_NODEMAILER_PASS,
        }
    });

    try {
        transport.verify(function (error, success) {
            if (error) {
                return {error};
            } else {
                console.log('El servidor de envio de email está listo');
            };
        });
        const info = await transport.sendMail({
            from: `${nameRemitente} <${remitente}>`,
            to: email,
            subject: motivo,
            html: `<div><h1> Hola: ${nombre} </h1> <p> ${cuerpo} </p> </div>`
        });
        return info;
    } catch (error) {
        return { error };
    };
};

export default EnvioCodigoConfirmacion;
