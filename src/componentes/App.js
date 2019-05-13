import React, {Component} from 'react';
import Header from './Header';
import Formulario from './Formulario';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';
import Resumen from './resumen';

class App extends Component {

  state = {
    resultado : '',
    datos: {}
  }

  cotizarSeguro = datos =>{ 
    const {marca, plan, year} = datos;

    // Agregar una base de 2000,
    let resultado = 2000;

    // Obtener la diferencia de años 
    const diferencia = obtenerDiferenciaAnio(year)
     
    // por cada año restar el 3%
    resultado -= ((diferencia *3) * resultado) /100; 

    //Dependiendo la marca seleccionada aumentara un porcentaje respectivo
    // *Americano 15%
    // *Asiatio 5%
    // *Europeo 30%

    resultado = calcularMarca(marca) * resultado;

    //El plan del auto, el basico incrementa el valor 20% y cobertura completa 50%
    let incrementoPlan = obtenerPlan(plan);

    //dependiendo del plan incrementar
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    //crear objeto para el resumen
    const datosAuto = {
      marca : marca,
      plan : plan,
      year: year
    }

    //Enviando datos al state
    this.setState({
      resultado : resultado,
      datos: datosAuto
    })
  }

  render(){
    return (
      <div className="contenedor">
        <Header
          titulo = "Cotizador de Seguro de Auto"
        />
  
        <div className="contenedor-formulario">
          <Formulario
            cotizarSeguro = {this.cotizarSeguro}
          />

          <Resumen
            datos = {this.state.datos}
            resultado = {this.state.resultado}
          />
        </div>
      </div>
    );
  }
}

export default App;