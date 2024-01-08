import { useEffect, useState } from "react"

export default function Process({pName, pPid, pCpu, pMemory, index}) {
    const [name, setName] = useState(pName);
    const [pid, setPid] = useState(pPid);
    const [cpu, setCpu] = useState(pCpu);
    const [memory, setMemory] = useState(pMemory);    

    const handleIsIndexEvenOrOdd = (i) => {
        const classname = i % 2 == 0 ? 
            'bg-slate-400 text-gray-700' 
        : 'bg-slate-500 text-gray-100';
        return classname;
    }


    return(
        <div className={"p-2 m-2 grid grid-cols-4 rounded-3xl " + handleIsIndexEvenOrOdd(index)}>
            <div className="ml-1 flex items-center text-sm font-semibold border-r-2 px-2">{name}</div>
            <div className="border-r-2 flex items-center justify-center">{pid}</div>
            <div className="border-r-2 flex items-center justify-center">{cpu} <span>%</span></div>
            <div className="flex items-center justify-center">{memory} <span>MB</span></div>     
        </div>
    )
}