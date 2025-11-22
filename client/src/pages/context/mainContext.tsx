import React, { Children, ReactElement, useEffect, useState } from "react";
import '../../assets/stylesheets/comps.css'
import { createContext } from "react";

interface contextTy {
    addAlert?: (msg: string) => void
    c?: any
}

export const MainContextEx = createContext<contextTy>({});

function MainContext({children}) {
 /* VARIABLES*/
    const [alertMsgs, setAlertMsg] = useState<string[]>([])

 /* FUNCTIONS */
    const AlertFNS = {
        "newAlert": (msg: string) => {
            setAlertMsg(p => ([...p, msg] ));
            console.log('sss')
            AlertFNS.clearAlerts(msg)
        },
        "closeBtn": (msg: string) => {
            setAlertMsg(p => {
                let a = alertMsgs.filter(al => al !== msg );
                return a
            })
        },
        "clearAlerts": (msg: string) => {
            let intervaldID: number;

            intervaldID = setInterval(() => {
                let a = alertMsgs.filter(al => al !== msg);
                setAlertMsg(p => (a ))

                clearInterval(intervaldID)
                console.log('running')
            }, 10000);

        }
    }// alert_fns

    useEffect(() => {
    }, [])

 /* APPEND */
    const AppendAlerts = alertMsgs.map((it,id) => {
        return(
            <div key={id} className="alert">
                <p className="close_x" onClick={e => AlertFNS.closeBtn(it)}>X</p> 
                <p id="alert_body">{it}</p>
                <div id="indicator"></div>   
            </div>
        )
    })

 /* return */
    return(
        <MainContextEx.Provider value={{
            addAlert: AlertFNS.newAlert,
        }}>
            <div id="alerts_div">
                {
                    AppendAlerts
                }
            </div>
            {
                children
            }
        </MainContextEx.Provider>
    )
}

export default MainContext;