
import "dotenv/config";
import app from './src/server/server';
import { conectar } from "./src/baseDeDatos/conectar";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    conectar();
    console.log(`Server inicializado en el puerto ${PORT}`);  
});
