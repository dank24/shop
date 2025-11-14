import React from "react";
import {Route, Routes, BrowserRouter } from 'react-router-dom'

import DashBoardPage from "./pages/dashboard.tsx";
import RegisterPage from "./pages/register.tsx";
import LandingPage from "./pages/landing";

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
            path="/home/:id?" element = {<ProtectRoutes> < DashBoardPage /> </ProtectRoutes>}>
          </Route>

        </Routes>
      </MainContext>
    </BrowserRouter>

  )

}

export default App
