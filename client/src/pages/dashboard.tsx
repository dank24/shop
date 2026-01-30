import React, { BaseSyntheticEvent, useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCurrentMktWeek, createNewMkt } from "../api/userApi";

import { MainContextEx } from "./context/mainContext";
import AddShopMini from "../components/minis/add_shop";
import In_Out from "../components/pages/in_out";
import SideBar from "../components/utils/sideBar";

interface infoCardsSecTy {
    main: string,  secondary?: string | null, btn1?: string, btn2?: string
}
interface utiliiesBtnTy {
    name: string,  link: string,  type?: string
}
interface historyDivTy {
    header: string,  main: string,  date: string
}

function DashBoardPage() {
 /* REACT HOOKS */
    const navigate = useNavigate();
    const {addAlert, week} = useContext(MainContextEx)

 /* VARIABLES */
    const [inDisplay, setInDisplay] = useState<string>('utilities');
    const [searchParams, setSearchParams] = useSearchParams();
    const [mktWeek, setMktWeek] = useState('')
    let currentView = searchParams.get('view');
    

 /* FUNCTIONS */
    function handleSecOne(e: BaseSyntheticEvent) {
        const {tagName, className, id, innerHTML} = e.target;

        if(tagName == 'BUTTON' && innerHTML == 'Add') {
            let str = 'add_' + id.toLowerCase();
            setSearchParams(p => ({view: str } ))
        }

        if(tagName == 'BUTTON' && innerHTML == 'Manage') {
            navigate(`/home/${id.toLowerCase()}s`)
        }

        if(tagName == 'BUTTON' && innerHTML == 'Set') {
        }

        if(id == 'Market Week' && innerHTML == 'View') {
            navigate('/home/dates')
        }

    }// first_sec_fn

    function handleSecTwo(e: BaseSyntheticEvent) {
        let {tagName, id, className, innerHTML} = e.target;
        innerHTML = innerHTML.toLowerCase();

        if(className == 'sec2div1_toggle') {
            setInDisplay(p => (innerHTML ))
        }

    }// second_sec_fn

    function handleUtilsBtn(e: BaseSyntheticEvent) {
        const {className, id, innerHTML} = e.target

        if(className.includes('inpage')) {
            setSearchParams(p => ({...p, view: id}))
        }
    }// handle_utils_fn

 /* APPEND DATA */
    const [infoCardsSec, setInfoCardsSec] = useState<infoCardsSecTy[]>([
        {main: 'Store', secondary: 'count: 20', btn1: 'Add', btn2: 'Manage' },
        {main: 'Manager', secondary: 'count: 4', btn1: 'Add', btn2: 'Manage'  },
        {main: 'Product', secondary: 'count: 20', btn1: 'Add', btn2: 'Manage' },
        {main: 'Market Week', secondary: week?.display, btn1: 'Set', btn2: 'View'  },
    ])
    const [utilityBtns, setUtilityBtns] = useState<utiliiesBtnTy[]>([
        {name: 'Product Transfers', link: 'prdmovement', type: 'inpage'},
        {name: 'Update Prices', link: 'prices', type: 'inpage'},
        {name: 'View Stocks', link: 'stock', type: 'inpage'},
        {name: 'Order', link: 'order', type: 'inpage'},
        {name: 'Cash', link: 'cash', type: 'inpage'},

    ])
    const [historyData, setHistoryData] = useState<historyDivTy[]>([
        {header: 'Stock update', main: 'Main Shop update Stock', date: '12/10/25'},
        {header: 'Stock update', main: 'Main Shop update Stock', date: '12/10/25'},
    ])

 /* APPEND */
    const AppendSec1 = infoCardsSec.map((it, id) => {
        return(
            <div key={id} className="sec1_divs" > 
                <button id={it.main}>{it.btn1}</button>
                <div>
                    <h4>{it.main}</h4>
                    <h4>{it.secondary}</h4>
                </div>
                <button id={it.main}>{it.btn2}</button>
            </div>
        )
    })

    const AppendUtils = utilityBtns.map((it, id) => {
        return(
            <button key={id} className={`util_btns ${it.type}`} id={it.link} onClick={handleUtilsBtn}>
                {it.name}
            </button>
        )
    })

    const AppendHistory = historyData.map((it, id) => {
        return(
            <div key={id} className="history_datas">
                <h3>{it.header}</h3>
                <p>{it.main}</p>
                <h5>{it.date}</h5>
            </div>
        )
    })

 /* Useeffect */


 /* return */
    return(
        <main id="dashboard_page_main">
            < SideBar 
                
            />

            { !currentView &&
             <>
                <section id="dashboard_first_sec" onClick={handleSecOne}>
                    {
                        AppendSec1
                    }
                </section>
            
                <section id="dashboard_second_sec" onClick={handleSecTwo}>
                    <div id="sec2div1">
                        <p className="sec2div1_toggle">utilities</p>
                        <p className="sec2div1_toggle">History</p>
                    </div>

                    <div id="sec2div2">
                        { inDisplay == 'utilities' &&
                            AppendUtils
                        }

                        { inDisplay == 'history' && 
                            AppendHistory
                        }

                    </div>
                </section>
             </>
            }

            { currentView?.startsWith('add') &&
                <AddShopMini />

            }

            { currentView == 'prdmovement' &&
                <In_Out />
            }


        </main>
    )
}

export default DashBoardPage