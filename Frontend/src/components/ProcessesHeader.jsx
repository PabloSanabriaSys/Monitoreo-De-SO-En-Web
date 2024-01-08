export default function ProcessesHeader({cpuUsage, memoryUsage}) {


    return(
        <div className='px-3 mx-auto text-xl py-3 grid grid-cols-4 bg-slate-800 text-white mb-4 rounded-b'>
          <div className='flex justify-center items-center border-r-2 py-1 text-base ml-1 px-2'>Name</div>
          <div className='flex justify-center items-center border-r-2 text-base'>PID</div>
          <div className='flex justify-center items-center border-r-2 text-base'>CPU {cpuUsage}%</div>
          <div className='flex justify-center items-center text-base'>Memory {memoryUsage}%</div>
        </div>
    )
}