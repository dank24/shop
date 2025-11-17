import React, { useState } from "react";

import SideBar from "../components/utils/sideBar";

function StoresPage() {
 /* variables */

 /*  Append Data */
    const [storesData, setStoreData] = useState([
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
        {name: 'Main Shop', id: 'SHP01', manager: 'Micheal', contact: '07061071398', location: 'ogidi', access: 'L0', status: 'red' },
    ])

 /* Append */
    const AppendStores = storesData.map((it,id) => {
        return(
            <div key={id} className="stores_divs">
                <h2>
                    {it.name}
                </h2>

                <div>
                    <h3>Manager</h3>
                    <p>{it.manager}</p>
                </div>

                <div>
                    <h3>Contact</h3>
                    <p>{it.contact}</p>
                </div>

                <div>
                    <h3>Location</h3>
                    <p>{it.location}</p>
                </div>
               
               <section>
                    <p>ID: {it.id}</p>
                    <p>Access: {it.access}</p>
                    <p>Status: {it.status}</p>
               </section>

               <button>Click Me</button>
            </div>
        )
    })

 /* functions */


 /* return */
    return(
        <main id="stores_page_main">
            <div id="sidebar_container_div">
                < SideBar  header ='Stores' />
            </div>
            
            
            <section id="stores_first_sec">
                {
                    AppendStores
                }
            </section>
        </main>
    )
}

export default StoresPage