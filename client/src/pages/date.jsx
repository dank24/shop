import { useState, useRef, useEffect, useContext } from "react"
import '../assets/stylesheets/pages.css'
import SideBar from "../components/utils/sideBar"
import { MainContextEx } from "./context/mainContext"
import { getMktWeeks } from "../api/genApi"

function DatesPage() {
 /* HOOKS */
    const checkRefs = useRef({})
    const {mktWeek} = useContext(MainContextEx)

 /* VARIABLES */
    const [Loading, setLoading] = useState(false);
    const [isVisible, setIsvisible] = useState(false);

    const [mktWeeks, setMktWeeks] = useState([
        {week: '01', starts: '01-07-2025', ends: '07-07-2025'},
        {week: '02', starts: '01-07-2025', ends: '07-07-2025'},
        {week: '03', starts: '01-07-2025', ends: '07-07-2025'}
    ])

 /* APPEND */
    const AppendMktWeeks = mktWeeks.map((it, id) => {
        return(
            <div key={id} className="mktweek_divs">
                <div>
                    <h4>Week: {it.week}</h4>
                    <div id="check_div" className={it.week} 
                        onClick={e => handleCheck(it.week)} ref={el => checkRefs.current[id] = el}
                    ></div>

                </div>
                <div>
                    <p><b>Starts:</b>  <em>{it.starts}</em></p>
                    <p><b>Ends:</b> <em>{it.ends}</em></p>
                </div>
            </div>
        )
    })

 /* FUNCTIONS */
    function handleCheck(name) {
        for(let c in checkRefs.current) {
            const div = checkRefs.current[c];

            if(div.className == name) {
                div.style.backgroundColor = 'red'
            } else {
                div.style.backgroundColor = 'transparent'
            }

        }
    }

    function HeaderMini(prps) {
        return(
            <div className="header_div">
                <div id="first_div"></div>
                <p>{prps.txt}</p>
                <div id="second_div"></div>
            </div>
        )
    }// header_comp

 /* USEEFFECT */
    useEffect(() => {   
        const GETMKTWEEKS = getMktWeeks()
        .then(res => setMktWeeks(p => (res)))
        .catch(err =>  console.log(err))
        
    }, [])

 /* RETURN */
    return(
     <>
        <div id="sidebar_container_div">
            < SideBar  header ='Stores' />
        </div>

        <main id="dates_page_main">
            { Loading &&
              <h3>Loading</h3>

            }

            { !Loading && mktWeeks.length == 0 && 
                <h4>Nothing to see here</h4> 

            }

            { !Loading && mktWeeks.length > 0 && 
              <section id="dates_first_sec">
                    <div id="year_div">
                        <h4>Year</h4>
                        <div id="year_dropdown">--select</div>

                        { isVisible && 
                            <div id="drop">
                                <p>2023</p>
                                <p>2024</p>
                                <p>2025</p>
                                <p>2026</p>
                            </div>
                        }

                    </div>

                    < HeaderMini txt = 'Current'/>

                    <div className="mktweek_divs">
                        <h4>Week: {mktWeeks[mktWeeks.length - 1].week}</h4>
                        <div>
                            <p>Starts: {mktWeeks[mktWeeks.length - 1].starts}</p>
                            <p>Ends: {mktWeeks[mktWeeks.length - 1].ends}</p>
                        </div>
                    </div>

                    < HeaderMini txt = 'All' />

                    <div>
                        
                    </div>
                    {
                        AppendMktWeeks
                    }
              </section>
            }
        </main>
     </>
    )
}

export default DatesPage