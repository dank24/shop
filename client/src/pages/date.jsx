import { useState, useRef, useEffect, useContext } from "react"
import '../assets/stylesheets/pages.css'
import SideBar from "../components/utils/sideBar"
import { MainContextEx } from "./context/mainContext"
import { getMktWeeks, getYears, createYear } from "../api/genApi"

function DatesPage() {
 /* HOOKS */
     const {mktWeek, setWeek, addAlert} = useContext(MainContextEx)
    const checkRefs = useRef({})

 /* VARIABLES */
    const [isDropdownVisi, setIsDropdownVisi] = useState(false);
    const [dropdownTxt, setDropDownTxt] = useState('--select');
    const [currentWeek, setCurrentWeek] = useState({});
    const [inputValue, setInputValue] = useState('')
    const [Loading, setLoading] = useState(false);

 /* FUNCTIONS */
    function getWeeksFN(year) {
        const OPER = getMktWeeks(year)
        .then(res => {
            res.status == 'success' && (
                setMktWeeksData(p => (res.data)),
                setDropDownTxt(year), 
                setIsDropdownVisi(false)
            )
        })
        .catch(err => console.log(err))
        
    }//

    function handleCheck(week, it) {
        for(let c in checkRefs.current) {
            const div = checkRefs.current[c];

            if(div.className == week) {
                div.style.backgroundColor = 'red'
            } else {
                div.style.backgroundColor = 'transparent'
            }
        }
        localStorage.setItem('currentWeek', JSON.stringify(it));
        setCurrentWeek(p => (it ));

        const weekObj = {
            display: it.id.substring(3),
            id: it.id,
            year: it.ends.substring(11)
        };
        setWeek(p => (weekObj ));

    }//

    function handleYearSele(e) {
        const {id, className, innerHTML} = e.target;

        if(className == 'option') {
            getWeeksFN(innerHTML);
        }

        switch(id) {
            case ('year_dropdown_btn'):
                setIsDropdownVisi(p => (!p ))
            break;

            case ('add_btn'):
                console.log('send', Number(inputValue) )
                if(Number(inputValue) != inputValue ) return addAlert('input is not a valid year');

                const CREATEYEAROPER = createYear(inputValue)
                .then(res => res.status == 'success' && (
                    setDropDownTxt(inputValue), setIsDropdownVisi(false),
                    setYearsData(p => ([...p, inputValue ]))
                ) )
                .then(getWeeksFN(inputValue))
                .catch(err =>  console.log(err))


            break;

            default:
                null;
            break
        }
    }//

 /* APPEND DATA */
    const [yearsData, setYearsData] = useState([]);

    const [mktWeeksData, setMktWeeksData] = useState([
        //{week: '03', starts: '01-07-2025', ends: '07-07-2025'}
    ])


  /* APPEND */
    const AppendYears = yearsData.map((it, id) => {
        return(
            <p key={id} className="option" >{it}</p>
        )
    })

    const AppendMktWeeks = mktWeeksData.map((it, id) => {
        return(
            <div key={id} className="mktweek_divs">
                <div>
                    <h4>{it.week}</h4>
                    <div id="check_div" className={it.week} 
                        onClick={e => handleCheck(it.week, it)} ref={el => checkRefs.current[id] = el}
                    ></div>

                </div>
                <div>
                    <p><b>Starts:</b>  <em>{it.starts}</em></p>
                    <p><b>Ends:</b> <em>{it.ends}</em></p>
                </div>
            </div>
        )
    })

    const AppendCurrent = (
        <div className="mktweek_divs">
            <h4>{currentWeek.week}</h4>
            <div>
                <p>Starts: {currentWeek.starts}</p>
                <p>Ends: {currentWeek.ends}</p>
            </div>
        </div>
    )
    
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
        const currentWK = localStorage.getItem('currentWeek')
        currentWK !== null && setCurrentWeek(p => (JSON.parse(currentWK) ))

        const GETYEARS = getYears()
        .then(res => res.status == 'success' && ( setYearsData(p => (res.data )) ))
        .catch(err => console.log('err'));
        
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
            
            { !Loading &&
                <div id="year_div" onClick={handleYearSele}>
                    <h4>Year</h4>
                    <div id="year_dropdown_btn">{dropdownTxt}</div>

                    { isDropdownVisi && 
                        <div id="drop">
                            {
                                AppendYears
                            }
                            <div>
                                <input placeholder="Add" value={inputValue} onChange={e => {
                                    setInputValue(p => (e.target.value))
                                }}  id="add_input"
                                /> 
                                <button id="add_btn">Add</button> 
                            </div>
                            
                        </div>
                    }

                </div>

            }

            { !Loading && mktWeeksData.length == 0 && 
                <h4>Nothing to see here</h4> 

            }

            { !Loading && mktWeeksData.length > 0 && 
              <section id="dates_first_sec" >
                    < HeaderMini txt = 'Current'/>

                    {
                        AppendCurrent
                    }

                    < HeaderMini txt = 'All' />

                    <div>
                        
                    </div>
                    {
                        AppendMktWeeks
                    }

                    <div style={{height: '10px'}} id='footer_div'></div>
              </section>
            }
        </main>
     </>
    )
}

export default DatesPage