import React from "react";

function ButtonComp(props) {

    /* variables         */


    /* functions         */
    function btnFn(e) {
        props.btnFn(e)
    }


    /* return        */
    return(
        <main id="button_comp_main">
            <button onClick={btnFn} >
                {props.btntxt}
            </button>
        </main>
    )
}

export default ButtonComp