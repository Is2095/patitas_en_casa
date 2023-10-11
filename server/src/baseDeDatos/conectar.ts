
import mongoose from "mongoose";

const { MONGODB_URL } = process.env;

if (!MONGODB_URL) {
    throw new Error('URL de conección no existe');
}

export const conectar = async (): Promise<boolean> => {

    try {        
        const { connection } = await mongoose.connect(MONGODB_URL as string);
        if (connection.readyState === 1) {
            console.log('Mongodb conectada');
            return Promise.resolve(true);
        }
        return Promise.reject(false);
    } catch (error) {
        console.log(error);
        return Promise.reject(false);
    };

};
