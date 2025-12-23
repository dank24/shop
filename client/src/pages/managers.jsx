import React, { useEffect, useState } from "react";

import EditComp, { EditBtnsComp,} from "../components/utils/editComp";
import SideBar from "../components/utils/sideBar";
import { getManagers } from "../api/managersApi";
import '../assets/stylesheets/comps.css'

function ManagersPage() {
 /* VARIABLES */
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [selectedData, setSelectedData] = useState(null)
    
 /* FUNCTIONS */
    const sideBarFns = {
        "FN1": () => {
            setIsEditVisible(p => (!p))
        }
    }// sideBar_fns

    function handleEditBtns(clas, re, cate) {
        if(clas == 'edit_btn') {
            setSelectedData(p => ({...re, cate}))
            console.log(clas)
        }

        if(clas == 'edit_comp'){
            setSelectedData(re);
            getStoresData()
        }

    }// handle_edit_fn

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

                    { isEditVisible &&
                        <div id="edit_btns_cont">
                            < EditBtnsComp 
                                data = {it} id = {it.id}
                                fn = {handleEditBtns}
                            />
                        </div>
                    }

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
        { selectedData !== null &&
            <EditComp 
                cate = {selectedData.cate} fn = {handleEditBtns}
                name = {selectedData.name} useIn = {1}
                data = {selectedData}  
            />

        }
        
     { managersData.length >= 1 &&
        <main id="managers_page_main">
            <div id="sidebar_container_div">
                < SideBar 
                    header='Managers' fn1Btn = 'Edit'
                    fn1 = {sideBarFns.FN1}
                />
            </div>

            <section id="managers_first_sec">
                { selectedData == null &&
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