import React, { useState } from "react";

function SideBar(props) {
 /* variables */
    const [sideBarOn, setSideBarOn] = useState<boolean>(false)

 /* function */
    function handleHamburg() {
        setSideBarOn(p => (!p))
    }

 /* return */
    return(
        <main id="sidebar_comp_main">
            <p onClick={handleHamburg}>☰</p>
            <div id="header_div">
                <h3>{props.header}</h3>
            </div>
            
            { sideBarOn &&
             <section id="sidebar_sec">
                
             </section>

            }

            <div id="side_fn_div">
                <h3 onClick={props.fn1}>{props.fn1Btn}</h3>
                <p onClick={props.fn2}>{props.fn2Btn}</p>
            </div>
        </main>
    )
}

export default SideBar