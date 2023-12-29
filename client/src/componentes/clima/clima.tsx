'use client'
import { useState, useEffect } from "react"


const Clima = () => {

    const [apa, setApa] = useState('')

    const [climaData, setClimaData] = useState({
        temp: 0,
        textCondicion: '',
        icon: '',
        region: '',
        pais: '',
        ok: false
    })

    useEffect(() => {
         const llamarDatosDelClima = async () => {
             let urlWeather2 = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_KEYOPENWEATHER}&lang=es&q=Mendoza`
             let urlWeather = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_KEYWEATHER}&q=Mendoza&lang=es`
            
            await fetch(urlWeather)
                .then((res) => {
                    if (!res.ok) throw { res }
                    return res.json()
                })
                .then((weatherData) => {
                    const datos = {
                        temp: weatherData.current.temp_c,
                        textCondicion: weatherData.current.condition.text,
                        icon: weatherData.current.condition.icon,
                        region: weatherData.location.region,
                        pais: weatherData.location.country,
                        ok: true,
                    }
                    setClimaData(datos)
                })
                .catch((error) => {
                    console.log(error);

                })
        }
        llamarDatosDelClima()    
    }, [])

    return (
        <div>
            {climaData.ok ? (
                <div className="flex items-center justify-center mx-4 max-w-xs text-xs">
                    <div className="flex pl-10 items-center ">
                        <p className="">{climaData.temp}°C</p>
                        <img src={climaData.icon} alt="" className="flex items-center w-8 h-6" />
                    </div>
                    <div className="flex">                    
                        <p>{climaData.region}/{climaData.pais}</p>
                    </div>
                </div>
            ) : null

            }
        </div>
    )
}
export default Clima;