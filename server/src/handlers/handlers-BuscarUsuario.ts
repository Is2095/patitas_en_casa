
import { conectar } from '../baseDeDatos/conectar';
import Usuarios from '../modelos/usuarios';

const HandlersBuscarUsuario = async ({ email, _id }: { email: string, _id: string }) => {
    try {
        await conectar();
        if (email) {
            const usuarioEmail = await Usuarios.findOne({ email });
            return usuarioEmail;
        } else if (_id) {
            const usuarioId = await Usuarios.findOne({ _id });
            return usuarioId;
        } else return null;

    } catch (error) {
        console.log(error, 'error');

    }
};
export default HandlersBuscarUsuario;