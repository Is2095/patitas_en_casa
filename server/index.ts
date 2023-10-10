
import "dotenv/config";
import app from './src/server/server';

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server inicializado en el puerto ${PORT}`);  
})