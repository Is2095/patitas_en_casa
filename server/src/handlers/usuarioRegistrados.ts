
import { conectar } from '../baseDeDatos/conectar';
import Usuarios from '../modelos/usuarios';

const UsuarioRegistrado = async ({ email, nombre }: { email: string, nombre: string }) => {
    try {
        await conectar();
        const emailRegistrado = await Usuarios.findOne({ email });
        return emailRegistrado;
    } catch (error) {
        return { error }
    };
};
export default UsuarioRegistrado;
