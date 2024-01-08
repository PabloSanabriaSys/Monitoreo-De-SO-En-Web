import React, { useEffect, useState } from 'react';
import VerticalBar from '../components/VerticarBar';
import Cards from '../components/Cards';
import Lines from '../components/Line';
import { SwapPie } from '../components/SwapPie';
import ReadWrite from '../components/ReadWrite';
import axios from 'axios';
import { RamPie } from '../components/RamPie';

export default function DiscosRam() {
  const [historialSwap, setHistorialSwap] = useState([]);
  const [historialRam, setHistorialRam] = useState([]);
  const [historialLectura, setHistorialLectura] = useState([]);
  const [historialEscritura, setHistorialEscritura] = useState([]);
  const [a, setA] = useState(null)
  const [historialTiempos, setHistorialTiempos] = useState([0]);

  useEffect(() => {
    const obtenerDatosAleatorios = async () => {
      const rutaCompleta = window.location.pathname;
      const segmentos = rutaCompleta.split('/');

      if (segmentos.length >= 2) {
        const rutaDesdeLaSegundaPosicion =  segmentos[1];
        console.log('Ruta desde la segunda posición:', rutaDesdeLaSegundaPosicion);
      }
      try {
        const respuesta = await axios.get('http://' + segmentos[1] + '/disco_memoria');

        let tam = 20;
        setHistorialSwap([respuesta.data.swap_total_gb-respuesta.data.swap_used_gb,respuesta.data.swap_used_gb]);
        setHistorialRam([respuesta.data.memory_available_gb,respuesta.data.memory_used_gb]);
        setA(respuesta.data.partitions)
        setHistorialLectura((prevHistorial) => {
          const nuevoHistorial = [...prevHistorial];
          nuevoHistorial.push(respuesta.data.read_gb);
          if (nuevoHistorial.length > tam) {
            nuevoHistorial.shift();
          }
          console.log(nuevoHistorial)
          return nuevoHistorial;
        });

        setHistorialEscritura((prevHistorial) => {
          const nuevoHistorial = [...prevHistorial];
          nuevoHistorial.push(respuesta.data.write_gb);
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
    console.log(historialTiempos)
  }, [historialTiempos])

  const JsonViewer = ({ data }) => {
    const jsonString = JSON.stringify(data, null, 2); // Aquí, 2 es la cantidad de espacios de sangría para la presentación

    return (
      <div className="whitespace-pre-wrap">
        <code className="text-gray-800">
          {jsonString}
        </code>
      </div>
    );
  };
  
  return (
    <div>
      <header className='flex justify-center text-4xl font-bold p-5 mb-16 text-slate-300'>
        <h1>Estado del Disco y la RAM</h1>
      </header>
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-10 px-7 m-auto w-full mb-5'>
        <RamPie newArray={historialRam}/>
        <SwapPie newArray={historialSwap}/>
      </section>
      <section className='grid grid-cols-1 gap-10 sm:grid-cols-2 sm:p-7'>
        <ReadWrite newArray={[historialEscritura,historialLectura]} newLabels={historialTiempos}/>
        {a &&  a.map((data, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md mb-4">
          <pre className="text-sm text-gray-800">
            <JsonViewer data={data} />
          </pre>
        </div>
      ))}
      </section>
      
    </div>
  );
}
