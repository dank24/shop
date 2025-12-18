import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MainContextEx } from "./context/mainContext";
import { getStores } from "../api/storeApi";
import {deleteItem} from '../api/userApi'

import deleteIcon from '../assets/images/icons/delete02.svg' 
import editIcon from '../assets/images/icons/edit02.svg'
import SideBar from "../components/utils/sideBar";

function StoresPage() {
 /* HOOKS */
    const navigate = useNavigate();
    const {addAlert} = useContext(MainContextEx)

 /* VARIABLES */
    const [delItemInfo, setDelItemInfo] = useState({del: false, name: 'StoreName', });
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [storesData, setStoresData] = useState([]);

 /* FUNCTIONS */
    const sideBarFns = {
        "FN1": (e) => {
            setIsEditVisible(p => (!p ))
        }
    }// siebar_fns

    function getStoresData() {
        const GETDATAFN = getStores()
        .then(resp => resp ? setStoresData(p => (resp )) : console.log('failure') )
    }// get_stores_data_fn

    function navToStore(lnk) {
        navigate('/home/stores/' + lnk.toLowerCase())
    }// navto_store_fn

    function handleEditOpers(e) {
        let [id, cla, html] = [e.target.id, e.target.className, e.target.innerHTML]
        console.log('i', id)


        if(cla == 'delete') {
            setDelItemInfo(p => ({del: true, name: id}));
 
        }
        
        if(html == 'Cancel') {
            setDelItemInfo(p => ({...p, del: false} ))
        }

        if(html == 'Continue') {
            const DELETFN = deleteItem(delItemInfo.name, 0)
            .then(res => {
                console.log('res:', res)
                if(res.status == 'success') {
                    addAlert(res.message);
                    setDelItemInfo(p => ({del: false}))
                    getStoresData();
                }
            } )
            .catch(err => console.log(err)) 
        }

    }// handle_edit_btns

 /* Append */
    const AppendStores = storesData.map((it,id) => {
        return(
            <div key={id} className="stores_divs">
                <div id="header_div">
                    <h2>
                        {it.name}
                    </h2>

                    { isEditVisible &&
                        <div id="edit_div">
                            <img alt="edit" id={it.id} src={editIcon} className="edit" width='30px' 
                                onClick={handleEditOpers}
                            />
                            <img alt='del' id={it.id} src={deleteIcon} width='30px' 
                                onClick={handleEditOpers} className="delete"
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

               <button onClick={e => navToStore(it.id)}>Click Me</button>
            </div>
        )
    }) 

    const AppendDeletePrompt = () => {
        return(
            <div id="main_prompt" onClick={handleEditOpers}>
                <div id="promp_cont_div">
                    <h4>
                        This Will PERMANENTLY <b style={{color: 'red'}}>DELETE</b> {delItemInfo.name}
                    </h4>

                    <div>
                        <h4>Continue</h4>
                        <h4>Cancel</h4>
                    </div>
                </div>
            </div>
        )
    }


 /* use Effect */
    useEffect(() => {
        getStoresData()
    }, [])


 /* return */
 
    return(
     <>
        <div id="sidebar_container_div">
            < SideBar  header ='Stores' 
                fn1Btn = 'Edit'  fn1 = {sideBarFns.FN1}      
            />
        </div>

        { storesData.length >= 1 &&
            <main id="stores_page_main">

                { delItemInfo.del && 
                    <AppendDeletePrompt />
                }                
     
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