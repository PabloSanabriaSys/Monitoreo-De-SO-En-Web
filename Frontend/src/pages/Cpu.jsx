import React, { useEffect, useState } from 'react';
import VerticalBar from '../components/VerticarBar';
import Lines from '../components/Line';
import { SwapPie } from '../components/SwapPie';
import ReadWrite from '../components/ReadWrite';
import axios from 'axios';
import CpuVelocidad from '../components/CpuVelocidad';


export default function Cpu() {

  const [labelsCpu, setlabelsCpu] = useState([]);
  const [dataCpus, setDataCpus] = useState([]);
  const [totalCpu, setTotalCpu] = useState([]);
  const [historialTiempos, setHistorialTiempos] = useState([0]);

  useEffect(() => {
    function obtenerCores(datos) {
      return datos.cpu_usage_per_core.map((item) => `Core ${item.core}`);
  }
  
    const obtenerDatosAleatorios = async () => {
      const rutaCompleta = window.location.pathname;
      const segmentos = rutaCompleta.split('/');

      if (segmentos.length >= 2) {
        const rutaDesdeLaSegundaPosicion =  segmentos[1];
        console.log('Ruta desde la segunda posición:', rutaDesdeLaSegundaPosicion);
      }
      try {
        const respuesta = await axios.get('http://'+ segmentos[1] +'/cpu');

        let tam = 20;
        setlabelsCpu(obtenerCores(respuesta.data));
        setDataCpus(() =>{return respuesta.data.cpu_usage_per_core.map(item => item.usage_percent);});

        
        setTotalCpu((prevHistorial) => {
          const nuevoHistorial = [...prevHistorial];
          nuevoHistorial.push(respuesta.data.cpu_percent);
          if (nuevoHistorial.length > tam) {
            nuevoHistorial.shift();
          }
          console.log(nuevoHistorial)
          return nuevoHistorial;
        });

        setHistorialTiempos(prevSegundos =>  prevSegundos.length < tam ? [...prevSegundos, prevSegundos[prevSegundos.length - 1] + 0.5] : [...prevSegundos.slice(1), prevSegundos[prevSegundos.length - 1] + 0.5] );

      } catch (error) {
        console.error('Error al obtener datos aleatorios:', error);
      }
    };

    const intervalo = setInterval(() => {
      obtenerDatosAleatorios();
    }, 500);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    console.log(dataCpus)
  }, [dataCpus])

  return <div >
    <header className=' flex justify-center text-4xl font-bold p-5 mb-16 text-slate-300'>
      <h1>Estado de la CPU</h1>
    </header>
    <section className='grid grid-cols-1 gap-10 sm:grid-cols-2 sm:p-7'>
      <VerticalBar newArray={dataCpus} newLabels={labelsCpu} />
      <CpuVelocidad newArray={[totalCpu]} newLabels={historialTiempos} />
      
    </section> 

  </div>;
}
