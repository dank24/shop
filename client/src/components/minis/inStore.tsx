import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getStore } from "../../api/storeApi";

import '../../assets/stylesheets/comps.css'
import ViewProducts from "../pages/viewPrds";
import ViewStockCounts from "../pages/viewStk";
import CashMini from "../pages/cash";
import Stock from "../pages/invCount";
import In_Out from "../pages/in_out";
import SideBar from '../utils/sideBar'

interface storeFnBtnsTy {
    btnTxt: string,  prelTxt?: string,  id?: string
}
interface storeDetailsTy {
    name: string, id?: string, access?: [], contact?: string, location?: string, manager?: string
}
interface divsTy {
    name: string, mid?: string, btn?: string 
}

function InStore() {
 /* HOOKS */
    const storeId = useParams().storeid

 /* VARIABLES */
    const [storeDetails, setStoreDetails] = useState<storeDetailsTy>({name: ''});
    const [searchParams, setSearchParams] = useSearchParams();
    const view = searchParams.get('view')

 /* FUNCTIONS */
    function handleBtns(e: BaseSyntheticEvent) {
        const {id } = e.target

        setSearchParams(p => ({...p, view: id} ))
    }

    console.log('view:', view)

 /* APPEND DATA */
    const [storeFnBtns, setStoreFnBtns] = useState<storeFnBtnsTy[]>([
        {btnTxt: 'View Goods', prelTxt: '12/12/25', id: 'overview'},
        {btnTxt: 'In-Out Goods', prelTxt: '12/12/25', id: 'in_out'},
        {btnTxt: 'Take Stock', prelTxt: 'This', id: 'stock'},
        {btnTxt: 'View Stocks', prelTxt: 'This', id: 'view_stock'},
        {btnTxt: 'Cash', prelTxt: 'This', id: 'cash'},
    ])
    const [divs, setDivs] = useState<divsTy[]>([
        {name: 'Sales', mid: 'this', btn: 'calculate Sales'},
        {name: 'Smething1', mid: 'this', btn: 'calculate Sales'},
        {name: 'Smething3', mid: 'this', btn: 'calculate Sales'},
    ])

 /* APPEND */
    const AppendFnBtns = storeFnBtns.map((it,id) => {
        return(
            <div key={id} className="fn_btn_div">
                <div>
                    <h4>Last update:</h4>
                    <p>{it.prelTxt}</p>
                </div>

                <button id={it.id} onClick={e => handleBtns(e)}>
                    {it.btnTxt}
                </button>
            </div>
        )
    }) 

    const AppendDivs = divs.map((it, id) => {
        return(
            <div key={id} className="firstsec_divs">
                <h3>{it.name}</h3>
                <div>{it.mid}</div>
                <button>{it.btn}</button>
            </div>
        )
    })

 /* USE EFFECTS */
    useEffect(() => {
        const GETSTOREFN = getStore(storeId)
        .then(res => res && setStoreDetails(p => ({...p, ...res} )) )
        .catch(err => console.log(err))
    }, [])

    console.log(storeDetails)

 /* RETURN */
    return(
     <>
        <div id="sidebar_container_div">
            < SideBar  header ='Store Name' />
        </div>

     { storeDetails.name === '' &&
        <h2>Loading store details</h2>

     }

     { storeDetails.name !== '' &&
        <main id="instore_mini_main">

            { !view &&
             <>
                <section id="instore_first_sec">
                    <h4>Nathaniel</h4>
                </section>

                <section id="instore_second_sec">
                    {
                        AppendDivs
                    }
                </section>

                <section id="instore_third_sec">
                    {
                        AppendFnBtns
                    }
                </section>
             </>

            }

            { view == 'overview' &&
                <ViewProducts access = {storeDetails.access} />
            }

            { view == 'in_out' &&
                <In_Out />
            }

            { view == 'stock' &&
                < Stock storeId = {storeDetails.id} />

            }

            { view == 'view_stock' &&
                < ViewStockCounts />
            }

            { view == 'cash' &&
                < CashMini />
            }


        </main>

     }
     </>
    )
}

export default InStore