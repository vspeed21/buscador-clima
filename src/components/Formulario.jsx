import useClima from "../hooks/useClima"


const Formulario = () => {

  const { busqueda, datosBusqueda, consultarClima, alerta, setAlerta }=  useClima();
  const { ciudad, pais } = busqueda;

  function handleSubmit(e) {
    e.preventDefault();

    if(Object.values(busqueda).includes('')) {
      setAlerta('Todos los campos son obligatorios');
      return;
    }

    consultarClima(busqueda);
  }

  return (
    <div className='contenedor'>
      {alerta && <p>{alerta}</p>}

      <form onSubmit={handleSubmit}>
        <div className='campo'>
          <label htmlFor='ciudad'>Ciudad</label>
          <input 
            type="text" 
            id='ciudad'
            name='ciudad'
            value={ciudad}
            onChange={datosBusqueda}

          />
        </div>

        <div className='campo'>
          <label htmlFor='pais'>País</label>
          <select 
            id='pais'
            name='pais'
            value={pais}
            onChange={datosBusqueda}
          >
            <option value='' disabled> --Seleccione un país--</option>
            <option value='US'>Estados Unidos</option>
            <option value='HN'>Honduras</option>
            <option value='MX'>Mexico</option>
            <option value='ES'>España</option>
            <option value='CO'>Colombia</option>
            <option value='AR'>Argentina</option>

          </select>
        </div>

        <input 
          type="submit" 
          value="Consultar clima"
        />
      </form>
    </div>
  )
}

export default Formulario