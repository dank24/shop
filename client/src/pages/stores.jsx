import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getStores } from "../api/storeApi";

import SideBar from "../components/utils/sideBar";

function StoresPage() {
 /* HOOKS */
    const navigate = useNavigate();

 /* VARIABLES */
    const [storesData, setStoresData] = useState([]);
    const [id, setId] = useSearchParams();


 /* FUNCTIONS */
    function getStoresData() {
        const GETDATAFN = getStores()
        .then(resp => resp ? setStoresData(p => (resp )) : console.log('failure') )
    }// get_stores_data_fn

    function navToStore(lnk) {
        navigate('/home/stores/' + lnk.toLowerCase())
    }// navto_store_fn


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
                    <p>Access: {it.access[0]}</p>
                    <p>Status: Blue</p>
               </section>

               <button onClick={e => navToStore(it.id)}>Click Me</button>
            </div>
        )
    }) 


 /* use Effect */
    useEffect(() => {
        getStoresData()
    }, [])

    console.log(storesData)

 /* return */
 
    return(
     <>
        <div id="sidebar_container_div">
            < SideBar  header ='Stores' />
        </div>

     { storesData.length >= 1 &&
        <main id="stores_page_main">
            

                    
            <section id="stores_first_sec">
                {
                    AppendStores
                }
            </section>
        </main>
     }

     {  storesData.length == 0 &&
        <h4>Loading</h4>

     }
     </>

    )
}

export default StoresPage