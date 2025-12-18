import React, { Children, ReactElement, useEffect, useState } from "react";
import '../../assets/stylesheets/comps.css'
import { getMktWeek } from "../../api/genApi";
import { createContext } from "react";

interface contextTy {
    addAlert?: (msg: string) => void
    mktWeek?: String
}

export const MainContextEx = createContext<contextTy>({});

function MainContext({children}) {
 /* VARIABLES*/
    const [alertMsgs, setAlertMsg] = useState<string[]>([])
    const [operating, setOperating] = useState(false);
    const [mktWeek, setMktWeek] = useState<String>('')
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
        const GETMKTWEEK = getMktWeek()
        .then(res => setMktWeek(p => (res.weekId )))
        .catch(err => console.log(err));

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
            { addAlert: AlertFNS.NEWALERT, mktWeek}}>
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