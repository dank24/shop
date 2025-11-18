import React, { useEffect, useState } from "react";
import SideBar from "../components/utils/sideBar";

import { getManagers } from "../api/managersApi";

function ManagersPage() {
 /* VARIABLES */

 /* APPEND DATA */
    const [managersData, setManagersData] = useState([])

 /* Append */
    const appendManagersData = managersData.map((it, id) => {
        return(
            <div key={id} className="managers_card_divs">
                <section id="profile_sec">
                    <h3>{it.name}</h3>

                    <div id="img_div"></div>
                </section>

                <div>
                    <h4>Phone</h4>
                    <p>{it.phone}</p>
                </div>

                <div>
                    <h4>Email</h4>
                    <p>{it.email}</p>
                </div>

                <div>
                    <h4>Guarantor</h4>
                    <p>{it.guarantor}</p>
                </div>

                <div>
                    <h4>Contact</h4>
                    <p>{it.guarantorPhone}</p>
                </div>

            </div>  
        )
    })

 /* FUNCTIONS */

 /* USE EFFECTs */
    useEffect(() => {
        const GETMANAGERSDATAFN = getManagers()
        .then(resp => resp ? setManagersData(p => (resp)) : console.log('failure') )
    }, [])
    console.log(managersData)

 /* RETURN */
    return(
     <>
     { managersData.length >= 1 &&
        <main id="managers_page_main">
            <div id="sidebar_container_div">
                < SideBar header='Managers' />
            </div>

            <section id="managers_first_sec">
                {
                    appendManagersData
                }
            </section>
        </main>
     }

     { managersData.length == 0 && 
        <h1>Loading Data</h1>

     }
     </>

    )
}

export default ManagersPage