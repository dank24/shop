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
            <h3>{props.header}</h3>
            
            { sideBarOn &&
             <section id="sidebar_sec">
                
             </section>

            }
        </main>
    )
}

export default SideBar