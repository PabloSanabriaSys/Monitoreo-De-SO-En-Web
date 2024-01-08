import React from 'react';
import VerticalBar from '../components/VerticarBar';
import Lines from '../components/Line';
import { SwapPie } from '../components/SwapPie';
import ReadWrite from '../components/ReadWrite';

export default function Pantilla() {
  
  return <div >
    <header className=' flex justify-center text-4xl font-bold p-5 mb-16 text-slate-300'>
      <h1>CONFIGURACION DE CHART JS</h1>
    </header>
    <section className='grid grid-cols-1 gap-10 sm:grid-cols-2 sm:p-7'>
      <VerticalBar newArray={[1,5,7,10,6,5,1]} />
      <Lines newArray={[[1,5,7,10,6,5,1,1],[4,5,1,5,1,6,1,7,20]]} />
      <Lines newArray={[[1,5,7,10,6,5,1,1],[4,5,1,5,1,6,1,7],[1,4,5,5,5,5,5]]} newLabels={[1,2,3,4,5,6,7]}/>
      
    </section> 

  </div>;
}
