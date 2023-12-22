
import { conectar } from '../baseDeDatos/conectar';
import Usuarios from '../modelos/usuarios';

const HandlersBuscarUsuarioContraseña = async ({ email, id }: { email?: string, id?: string }) => {
    try {
        await conectar();
        if (email) {
            return await Usuarios.findOne({ email }).select("+contraseña");
        } else if (id) {
            return await Usuarios.findOne({ id }).select("+contraseña");
        } else return null;
    } catch (error) {
        console.log(error, 'error');
        return error

    }
};
export default HandlersBuscarUsuarioContraseña;