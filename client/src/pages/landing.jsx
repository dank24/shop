import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate()
    /* variable */

    /* function */
    function temp(e) {
        const {id, innerHTML} = e.target;

        navigate(`/${innerHTML}`)
    }

    /* return */
    return(
        <main id="main_page_main" onClick={temp}>
            <h2>signup</h2>
        </main>

    )
}

export default LandingPage