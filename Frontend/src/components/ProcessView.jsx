import { useState } from 'react'
import Processes from './Processes';
import Process from './Process';
import ProcessesHeader from './ProcessesHeader';
import './main.css'
import { useEffect } from 'react';
import axios from 'axios';

function ProcessView() {
  const rutaCompleta = window.location.pathname;
  const segmentos = rutaCompleta.split('/');

  if (segmentos.length >= 2) {
    const rutaDesdeLaSegundaPosicion =  segmentos[1];
    console.log('Ruta desde la segunda posición:', rutaDesdeLaSegundaPosicion);
  }
  const url = 'http://'+segmentos[1]
  const processPath = '/procesos'

  const responsePlaceholder = {
    'total_cpu': 0,
    'total_memory': 79.4,
    'process_arary': [
      { 'name': 'Administrador de tareas', 'cpu': 7.6, 'memory': 54.9, 'id': 123 },
      { 'name': 'Brave Browser', 'cpu': 0.6, 'memory': 284.7, 'id': 12314 },
      { 'name': 'Obsidian', 'cpu': 0, 'memory': 86.7, 'id': 324 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 598 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 786 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 2345 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 654 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 2413 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 254 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 1432 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 6354 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 5687 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 586 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 2354 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 645 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 634 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 4123 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 534 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 1243 },
      { 'name': 'Visual Studio Code', 'cpu': 42.7, 'memory': 646.8, 'id': 543 },
    ]
  }


  const [processArr, setProcessArr] = useState([]);
  const [cpu, setCPU] = useState(responsePlaceholder.total_cpu);
  const [memory, setMemory] = useState(responsePlaceholder.total_memory);


  useEffect(() => {
    const getProcessArr = async () => {
      try {

        const response = await axios.get(url + processPath);
        let tam = 50;
        setProcessArr((p) => {
          const newP = [...response.data.process_arary]; // Usar solo los elementos más recientes
          if (p.length + newP.length > tam) {
            // Asegurarte de que no exceda el límite total
            const diff = p.length + newP.length - tam;
            p.splice(0, diff); // Eliminar elementos más antiguos si excede el límite
          }

          console.log(newP)
          return [...p, ...newP];
        });
        // console.log(processArr);
        setCPU(response.data.total_cpu);
        setMemory(response.data.total_memory);
      } catch (error) {
        console.error('Something went wrong getting response', error);
      }
    }
    const intervalo = setInterval(() => {
      getProcessArr();
    }, 700);

    return () => clearInterval(intervalo);
  }, [])

  // useEffect(() => {
  //   console.log('process changed', processArr)
  // }, [processArr])

  return (
    <>
      <div className=' bg-slate-800 text-white py-5'>
        <h1 className='text-center text-4xl'>Procesos</h1>
      </div>


      <Processes>
        <ProcessesHeader cpuUsage={cpu} memoryUsage={memory} />
        {processArr.map((p, i) => <Process
          pName={p.name}
          pPid={p.id}
          pCpu={p.cpu}
          pMemory={p.memory}
          key={i}
          index={i}
        />)}

      </Processes>

    </>
  )
}

export default ProcessView
