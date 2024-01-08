import Services from './Services';
import ServicesHeader from './ServicesHeader';
import Service from './Service';
import './main.css'
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function ServicesView () {
  const url = 'http://100.86.28.87'
  const servicesPath = '/servicios'
    const responsePlaceholder = [
          { 'name': 'Administrador de tareas', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 123, 'status':'running' },
          { 'name': 'Brave Browser', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 12314, 'status':'running' },
          { 'name': 'Obsidian', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 324, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 598, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 786, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 2345, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 654, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 2413, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 254, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 1432, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 6354, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 5687, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 586, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 2354, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 645, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 634, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 4123, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 534, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 1243, 'status':'running' },
          { 'name': 'Visual Studio Code', 'startup':'auto', 'desc': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus minima voluptate voluptas tenetur nemo illo at, dolores maiores rem atque ullam veniam velit est deserunt eius quae ut architecto numquam.', 'id': 543, 'status':'running' },
    ]
      

      const [servicesArr, setServicesArr] = useState([]);
    
      useEffect(() => {
        const getServiceArr = async () => {
          try {
    
            const response = await axios.get(url + servicesPath);
            let tam = 50;
            setServicesArr((p) => {
              const newP = [...response.data]; // Usar solo los elementos más recientes
              if (p.length + newP.length > tam) {
                // Asegurarte de que no exceda el límite total
                const diff = p.length + newP.length - tam;
                p.splice(0, diff); // Eliminar elementos más antiguos si excede el límite
              }
    
              // console.log(newP)
              return [...p, ...newP];
            });
            // console.log(processArr);
          } catch (error) {
            console.error('Something went wrong getting response', error);
          }
        }
        const intervalo = setInterval(() => {
          getServiceArr();
        }, 1000);
    
        return () => clearInterval(intervalo);
      }, [])

      return (
        <>
          <div className=' bg-slate-800 text-white py-5'>
            <h1 className='text-center text-4xl'>Servicios</h1>
          </div>
    
            <Services>
                <ServicesHeader />
                {
                    servicesArr.map((s, i) => <Service 
                        sName={s.nombre}
                        sPid={s.pid}
                        sDesc={s.desc}
                        sStart={s.inicio}
                        sStatus={s.estado}
                    />)
                }
            </Services>
          {/* <Processes>
            <ProcessesHeader cpuUsage={cpu} memoryUsage={memory}/>
            {processArr.map((p, i) => <Process
              pName={p.name}
              pPid={p.id}
              pCpu={p.cpu}
              pMemory={p.memory}
              key={i}
              index={i}
            />)}
            
          </Processes> */}
    
          </>
      )
}