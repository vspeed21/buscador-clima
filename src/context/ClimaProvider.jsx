import { createContext, useState } from 'react'
import axios from 'axios';

const ClimaContext = createContext();

export const ClimaProvider = ({children}) => {
  const [alerta, setAlerta] = useState('');

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });

  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false)

  function datosBusqueda(e) {
    setBusqueda({
      ...busqueda,
      [e.target.name] : e.target.value,
    })
  }

  async function consultarClima(datos) {
    setCargando(true);
    try {
      const { ciudad, pais } = datos; 
      const appId = import.meta.env.VITE_API_KEY;
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;

      const { data } = await axios(url);
      const { lon, lat } = data[0];

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      const { data: clima } = await axios(urlClima);

      setResultado(clima);
      
      setCargando(false);

    } catch (error) {
      setAlerta('Ciudad no encontrada');
    }
  }

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        datosBusqueda,
        consultarClima,
        resultado,
        cargando,
        alerta,
        setAlerta,
      }}
    >
      {children}
    </ClimaContext.Provider>
  )
}

export default ClimaContext