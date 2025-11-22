import React, { BaseSyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

import '../../assets/stylesheets/comps.css'
import ViewProducts from "../pages/viewPrds";
import CashMini from "../pages/cash";
import Stock from "../pages/stock";
import In_Out from "../pages/in_out";
import SideBar from '../utils/sideBar'

interface storeFnBtnsTy {
    btnTxt: string,  prelTxt?: string,  id?: string
}

function InStore() {

 /* VARIABLES */
    const [storeDetails, setStoreDetails] = useState(['s']);
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

 /* RETURN */
    return(
     <>
        <div id="sidebar_container_div">
            < SideBar  header ='Store Name' />
        </div>

     { storeDetails.length == 0 &&
        <h2>Loading store details</h2>

     }

     { storeDetails.length >= 1 &&
        <main id="instore_mini_main">

            { !view &&
                <section id="instore_first_sec">
                {
                    AppendFnBtns
                }
                </section>
            }

            { view == 'overview' &&
                <ViewProducts />
            }

            { view == 'in_out' &&
                <In_Out />
            }

            { view == 'stock' &&
                < Stock />

            }

            { view == 'view_stock'

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