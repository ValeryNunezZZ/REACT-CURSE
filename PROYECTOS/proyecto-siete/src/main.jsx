import './index.css'

import App from './App.jsx'

import Home from './views/Home.jsx'
import Citas from './views/Citas.jsx'
import Cita from './views/Cita.jsx'
import Error from './views/Error.jsx'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

/* const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true, Component: Home
      }
      ,
      {
        path: "citas", Component: Citas, children: [
          {
            path: "cita", Component: Cita
          }
        ]
      }
      ,
      {
        path: "error", Component: Error
      }
    ]
  }
]) */

//1.44

/* createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/> */


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<Home/>}/>
          <Route path='citas' element={<Citas/>}/>
          <Route path='citas/:id' element={<Cita/>}/>
          <Route path="*" element={<Error/>} />
        </Route>
    </Routes>
  </BrowserRouter>
);



/* Crea un enrutador básico con las siguientes rutas:
/: Página de inicio.
/citas: Lista de citas médicas.
/cita/:id: Detalles de una cita específica.
/*: Página de error para rutas no existentes. */



/* createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
 */