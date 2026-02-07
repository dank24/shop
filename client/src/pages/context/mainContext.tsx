import React, { Children, Dispatch, ReactElement, useEffect, useState } from "react";
import '../../assets/stylesheets/comps.css'
import { getMktWeek } from "../../api/genApi";
import { createContext } from "react";

interface contextTy {
    addAlert: (msg: string) => void
    week?: {display?: string, id?: string, year?: string}
    setWeek?: any
}

export const MainContextEx = createContext<contextTy>({addAlert: () => {}});

function MainContext({children}) {
 /* VARIABLES*/
    const [week, setWeek] = useState<{display?: string, id?: string, year?: string}>({})
    const [alertMsgs, setAlertMsg] = useState<string[]>([]); 
    const [operating, setOperating] = useState(false);
    let IID;

 /* FUNCTIONS */
    const AlertFNS = {
        "NEWALERT": (msg: string) => {
            setAlertMsg(p => ([...p, msg] ));
            !operating && setOperating(p => (true));

        },
        "CLOSEBTN": (msg: string) => {
            setAlertMsg(p => {
                let a = alertMsgs.filter(al => al !== msg );
                return a
            })
        },
        "CLEARALERTS": (msg: String) => {
            

        }
    }// alert_fns


 /* APPEND */
    const AppendAlerts = alertMsgs.map((it,id) => {
        return(
            <div key={id} className="alert">
                <p className="close_x" onClick={e => AlertFNS.CLOSEBTN(it)}>X</p> 
                <p id="alert_body">{it}</p>
                <div id="indicator"></div>   
            </div>
        )
    });

 /* USE EFFECT */
    useEffect(() => {   
        const selectedWeek = JSON.parse(localStorage.getItem('currentWeek') || '')
        setWeek(p => ({
            ...p, display: selectedWeek.id.substring(3), id: selectedWeek.id, 
            year: selectedWeek.ends.substring(11)
        } ))

    }, [])

    useEffect(() => { 
        if(alertMsgs.length > 0) {
            IID = setInterval(() => {
                setAlertMsg(prev => {
                    const fil = prev.filter((it,id) => id !== 0)
                    return fil
                })
            }, 2000)
        }    

        return () => {
            clearInterval(IID)
        }
  
    }, [alertMsgs])

 /* return */
    return(
        <MainContextEx.Provider value={
            { addAlert: AlertFNS.NEWALERT || '', week, setWeek: setWeek}
        }>
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