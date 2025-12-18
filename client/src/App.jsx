import React from "react";
import {Route, Routes, BrowserRouter } from 'react-router-dom'

import InStore from "./components/minis/inStore.tsx";
import DashBoardPage from "./pages/dashboard.tsx";
import RegisterPage from "./pages/register.tsx";
import ProductsPage from './pages/products.jsx'
import ManagersPage from './pages/managers.jsx'
import StoresPage from "./pages/stores.jsx";
import LandingPage from "./pages/landing";
import DatesPage from "./pages/date.jsx";

import MainContext from "./pages/context/mainContext.tsx";
import ProtectRoutes from './components/protectRoute.tsx'

function App() {

  return(
    <BrowserRouter>
      <MainContext>
        <Routes>
          <Route path="" element = {< LandingPage />}></Route>
          <Route path="/signup" element = {< RegisterPage />}></Route>
          <Route 
            path="/home/" element = {<ProtectRoutes> < DashBoardPage /> </ProtectRoutes>}>
          </Route>
          <Route
            path="/home/stores" element={<StoresPage /> }>
          </Route>
          <Route
            path="/home/managers" element={<ManagersPage /> }>
          </Route>
          <Route
            path="/home/products" element={<ProductsPage /> }>
          </Route>
          <Route 
            path="/home/dates" element={< DatesPage />} 
          ></Route>
          <Route
            path="/home/stores/:storeid" element={<InStore /> }>
          </Route>

        </Routes>
      </MainContext>
    </BrowserRouter>

  )

}

export default App
