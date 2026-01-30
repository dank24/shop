import React from "react";
import {Navigate } from 'react-router-dom'

import { isAuthenticated } from "../api/userApi";

function ProtectRoutes({children}) {
    if(!isAuthenticated() ) {
        return < Navigate to='/signup' replace/>
    }

    return children
}

export default ProtectRoutes