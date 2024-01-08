import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Outlet } from "react-router-dom"
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className=" min-h-screen  bg-slate-800">
            <Sidebar></Sidebar>
            <main className=" ml-14 ">
                <Outlet/>
            </main>
            
        </div>
  );
}

export default App;
