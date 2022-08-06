import useClima from "../hooks/useClima"


const Resultado = () => {
  const { resultado } = useClima();

  const { name, main } = resultado;

  const gKelvin = 273.15;

  return (
    <div className="contenedor clima">
      <h2>El clima de {name} es: </h2>

      <p>
        { parseInt(main.temp - gKelvin)} <span>&#x2103;</span>
      </p>

      <div className="temp-min-max">
        <p>
          Min: { parseInt(main.temp_min - gKelvin)} <span>&#x2103;</span>
        </p>

        <p>
          Max: { parseInt(main.temp_max - gKelvin)} <span>&#x2103;</span>
        </p>
      </div>
    </div>
  )
}

export default Resultado