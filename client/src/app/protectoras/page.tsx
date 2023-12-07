'use client'

import axios from "axios";
axios.defaults.withCredentials = true

const ProtectorasPage = () => {

    return (
        <div>
            <h1>Protectoras</h1>
            <button type="button" onClick={async () => {
                await axios.get("http://localhost:3001/api/prueba")
                    .then(datos => console.log('datos del usuario enviado del backend'))
                    .catch(error => console.log(error) )
            }}>prueba</button>
        </div>
    )
}

export default ProtectorasPage;