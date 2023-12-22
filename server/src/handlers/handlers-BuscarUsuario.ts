
import { conectar } from '../baseDeDatos/conectar';
import Usuarios from '../modelos/usuarios';

const HandlersBuscarUsuario = async ({ email, _id }: { email?: string, _id?: string}) => {
    let usuarioEmail
    let usuarioId
    try {
        await conectar();
        if (email) {
           usuarioEmail = await Usuarios.findOne({ email })
        }
        if (_id) {
            usuarioId = await Usuarios.findOne({ _id })
        }
        return { usuarioEmail, usuarioId }

    } catch (error) {
        console.log(error, 'error');
    }
};
export default HandlersBuscarUsuario;