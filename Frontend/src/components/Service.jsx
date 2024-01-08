import { useEffect, useState } from "react"

export default function Process({sName, sPid, sDesc, sStart, index, sStatus}) {
    const [name, setName] = useState(sName);
    const [pid, setPid] = useState(sPid);
    const [desc, setDesc] = useState(sDesc);
    const [startup, setStartup] = useState(sStart);    
    const [status, setStatus] = useState(sStatus);    

    const handleIsIndexEvenOrOdd = (i) => {
        const classname = i % 2 == 0 ? 
            'bg-slate-400 text-gray-700' 
        : 'bg-slate-500 text-gray-100';
        return classname;
    }


    return(
        <div className={"p-2 m-2 grid grid-cols-5 rounded-3xl " + handleIsIndexEvenOrOdd(index)}>
            <div className="ml-1 flex items-center text-sm font-semibold border-r-2 px-2">{name}</div>
            <div className="border-r-2 flex items-center justify-center">{pid}</div>
            <div className="border-r-2 flex items-center justify-center max-h-16 whitespace-no-wrap overflow-hidden overflow-ellipsis px-2">{desc}</div>
            <div className="border-r-2 flex items-center justify-center">{startup}</div>
            <div className="flex items-center justify-center">{status}</div>     
        </div>
    )
}