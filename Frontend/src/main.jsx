import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Pantilla from "./pages/Pantilla.jsx";
import Cards from "./components/Cards.jsx";
import DiscosRam from "./pages/DiscosRam.jsx";
import ProcessView from './components/ProcessView.jsx'
import Cpu from "./pages/Cpu.jsx";
import ServicesView from "./components/ServicesView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cards />,
  },

  {
    path: "/:ip",
    element: <App />,
    children:
      [
        {
          path: "",
          element:<ProcessView />,
        },
        {
          path: "ramrom",
          element:<DiscosRam/>,
        },
        {
          path: "cpu",
          element:<Cpu/>,
        },
        {
          path: "detalles",
          element:<Pantilla/>,
        },
        {
          path: "servicios",
          element:<ServicesView />,
        },
      ]
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
