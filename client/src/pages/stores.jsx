import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MainContextEx } from "./context/mainContext";
import { getStores } from "../api/storeApi";
import {deleteItem} from '../api/userApi'

import {EditBtnsComp } from "../components/utils/editComp";
import EditComp from "../components/utils/editComp";
import SideBar from "../components/utils/sideBar";

function StoresPage() {
 /* HOOKS */
    const navigate = useNavigate();
    const {addAlert} = useContext(MainContextEx)

 /* VARIABLES */
    const [isPromptVisible, setIsPromptVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [EditData, setEditData] = useState(null)
    const [storesData, setStoresData] = useState([]);

 /* FUNCTIONS */
    const sideBarFns = {
        "FN1": (e) => {
            setIsEditVisible(p => (!p ))
        }
    }// siebar_fns

    function getStoresData() {
        const GETDATAFN = getStores()
        .then(resp => resp ? setStoresData(p => ([...resp] )) : console.log('failure') )
    }// get_stores_data_fn

    function navToStore(lnk) {
        navigate('/home/stores/' + lnk.toLowerCase())
    }// navto_store_fn

    function handleEdit(clas, re, cate) {
        if(clas == 'edit_btn') {
            setEditData(p => ({...re, cate}))
            console.log(clas)
        }

        if(clas == 'edit_comp'){
            setEditData(re);
            getStoresData()
        }

    }// handle_edit_fn

 /* Append */
    const AppendStores = storesData.map((it,id) => {
        return(
            <div key={id} className="stores_divs">
                <div id="header_div">
                    <h2>
                        {it.name}
                    </h2>

                    { isEditVisible &&
                        <div id= 'edit_btns_cont'>
                            < EditBtnsComp 
                                id = {it.id} data = {it}
                                fn = {handleEdit}
                            />
                        </div>

                    }
                </div>
                
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

               <button onClick={e => navToStore(it.id)}>Go to...</button>
            </div>
        )
    })

 /* use Effect */
    useEffect(() => {
        getStoresData()
    }, [])

 /* return */
    return(
     <> 
        { EditData !== null && 
            <EditComp 
                name = {EditData.name}  fn = {handleEdit}
                cate = {EditData.cate}  data = {EditData}
                useIn = {0} height = '500px'
            />
        }

        <div id="sidebar_container_div">
            < SideBar  header ='Stores' 
                fn1Btn = 'Edit'  fn1 = {sideBarFns.FN1}      
            />
        </div>

        { storesData.length >= 1 && 
            <main id="stores_page_main">

                <section id="stores_first_sec" >
                    { EditData == null &&
                        AppendStores
                    }

                    <div id="sec_footer"></div>
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