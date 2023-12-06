
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import axios, { AxiosError }from "axios";
import { Session } from "next-auth";

interface user extends Session {
    name: string
    email: string
    imagen: string
};

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'email' },
                contraseña: { label: 'Contraseña', type: 'password', placeholder: '********' }
            },
            async authorize(credentials, req) {
                try {
                    const respuesta = await axios.post('http://localhost:3001/api/buscarUsuario', { email: credentials?.email })
                    const encontrarUsuario = respuesta.data
                    const { contraseña, ...usuarioBuscado } = encontrarUsuario.dato
                    const datosUsuarioAutenticacion = {
                        id: usuarioBuscado.id,
                        email: usuarioBuscado.email,
                        name: usuarioBuscado.nombre,
                        image: usuarioBuscado.imagen,
                        contraseña: 0
                    }
            
                    if (!encontrarUsuario.dato) {
                        throw new Error("Usuario no existe");
                    } else {
                        const compararContraseña = await bcrypt.compare(credentials!.contraseña, contraseña);
                        if (!compararContraseña) {
                            throw new Error("Credenciales inválidas");
                        } else {
                            return datosUsuarioAutenticacion;
                        };
                    };
                } catch (error) {
                    if (error instanceof AxiosError) {
                        throw new Error(error?.response?.data.message);
                    } else if (error instanceof Error) {                        
                        throw new Error(`${error?.message}`);
                    } else throw new Error('se produjo un error inesperado')
                }

               }
        })
    ],
    callbacks: {
        jwt({ account, user, profile, session, token }) {
            if (user) {
                token.user = user;
            };
            return token;
        },
        session({ session, token }) {
            session.user = token.user as user;
            return session;
        }
    }
});

export { handler as GET, handler as POST };