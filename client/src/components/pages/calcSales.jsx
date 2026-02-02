import React, { useEffect, useRef, useState, } from "react";
import { useParams } from "react-router-dom";

import { getBalanceWeeksForStore } from "../../api/genApi";
import { calcSales } from "../../api/storeApi";

import empySelect from '../../assets/images/icons/empty_square02.svg'
import filledSelect from '../../assets/images/icons/filled_square.svg'

function CalcSalesComp() {
 /* HOOKS */
    const imgsRef = useRef([null]);
    const storeId = useParams().storeid.toUpperCase();

 /* VARIABLES */
    const [isVisible, setIsVisible] = useState({
        isDropdownVisible: false,
        isSelectMktWeeksVisi: false,
        isYearDropdown: false
    })

    const [isSelectMktWeeksVisi, setIsSelectMktWeeksVisble] = useState(false);
    const [isDropdownVisible, setIsDropDownVisible] = useState(false);
    const [isYearDropdown, setIsYearDropdown] = useState(false);
    const [yearSelectTxt, setYearSelectTxt] = useState('-Year');
    const [mktWeeksData, setMktWeeksData] = useState([]);
    const [calcScreen, setCalcScreen] = useState(false);
    const [selectedTxt, setSelectedTxt] = useState('');
    const [yearsData, setYearsData] = useState([])
    const [page, setPage] = useState(0);
    const [dbWeeks, setDbWeeks] = useState([
         {
            "starts": "Sun Mar 02 2025",
            "ends": "Sat Mar 08 2025",
            "week": "week 10",
            "year": 2026,
            'id': 'WK-01-02'
        }, 
    ]);
    const [selectedDates, setSelectedDates] = useState({
        startID: '',
        endID: '',
        start: '',
        end: ''
    });


 /* Functions */
    const handleFirstSec = (e) => {
        const {id, className, innerHTML, name} = e.target;

        switch(className) {
            case('display_date_div') : 
                setIsDropDownVisible(p => (true ));
                setSelectedTxt(p => (className ))
            break;

            case('year_option') :
                const year = Number(innerHTML)
                const arr = dbWeeks.filter(week => {
                    return week.year == year
                })

                setMktWeeksData(p => (arr.sort((a, b) => (
                    Number(a.week.substring(5) ) - Number(b.week.substring(5) )
                ) ) ))

                setYearSelectTxt(innerHTML);
                setIsYearDropdown(false);

            break;

            case('mkt_week_option'):
                console.log('fel', id)
                setSelectedDates(p => ({...p, [selectedTxt.toLocaleLowerCase()]: id} ))
                setIsDropDownVisible(false)
            break;

            case('select_img') :
                const CD = mktWeeksData[Number(id)];
                const currentIMG = imgsRef?.current[Number(id)];

                if(selectedDates.end !== '' && selectedDates.start !=='' && currentIMG.src.includes('empty_square02')) {
                    const endINdex = selectedDates.endID;
                    imgsRef.current[endINdex].src = empySelect;

                    setSelectedDates(p => ({...p, end: CD.ends, endID: Number(id) }))
                    currentIMG.src = filledSelect;
                }
                
                else if(currentIMG.src.includes('empty_square02')) {
                    selectedDates.start == '' ? (
                        (setSelectedDates(p => ({...p, start: CD.starts, startID : Number(id) } )) )
                    ) : (
                        setSelectedDates(p => ({...p, end: CD.ends, endID: Number(id) } ))
                    )
                    currentIMG.src = filledSelect;
                } else {
                    let toModify = []
                    for(let ids in selectedDates) {
                        if(Number(id) == selectedDates[ids]) {
                            toModify.push(ids);
                            toModify.push(ids.slice(0, ids.length - 2) )
                        }
                    };

                    imgsRef.current[Number(id)].src = empySelect;
                    const obj2 = {...selectedDates, [toModify[0]]: '', [toModify[1]]: '' }
                    setSelectedDates(p => (obj2))
 
                }

            break;

            default:
                null
            break;
        }

        switch(id) {
            case('close_x') : 
                setIsDropDownVisible(false)
            break

            case('next') :
                setPage(p => (p + 11))
            breakdisplay_date_div;

            case('prev') : 
                setPage(p => (p - 11))
            break;

            case('year_select') :
                console.log('st')
                setIsYearDropdown(p => (!p ))
            break;

            case('go_btn') :
                const sObj = {
                    startID: mktWeeksData[selectedDates.startID].id,
                    endID: selectedDates.end !== '' && mktWeeksData[selectedDates.endID].id || false ,
                    storeID: storeId

                }

                const CALCOPER = calcSales(sObj)
                console.log('siren:', sObj)
            break;

            default:
                null
            break;
        }
    }

    //console.log('light:', dbWeeks)

 /* Append */
    const AppendYearsData = yearsData.map((it, id) => {
        return(
            <p key={id} className="year_option">{it}</p>
        )
    });

    const AppendMktWeeks = mktWeeksData.map((it, id) => {
        return(
            <div key={id} id={it.id} className="mkt_week_option">
                <h3>{it.week}</h3>
                <p className="date_p">{it.starts.substring(4)}</p>
                <p className="date_p">-</p>
                <p className="date_p">{it.ends.substring(4)}</p>
                <img id={id} className='select_img' src={empySelect} width='25px' 
                    ref={its => imgsRef.current[id] = its}
                />
            </div>
        )   
    });

 /* USE EFFECT */
    useEffect(() => {
        const GETBALANCEWEEKSOPER = getBalanceWeeksForStore(storeId)
        .then(res => {
            res.status == 'success' && (
            setDbWeeks(p => ([...p, ...res.data])) );

            return res.data;
        } )
        .then(ct => {
            const filtYear = ct.reduce(
                (acc, current) => {
                    if(!acc.includes(current.year)) {acc = [...acc, current.year] }
                    return acc
                }, []
            ).sort((a,b ) => a - b );

            setYearsData(p => (filtYear ));
        })
        .catch(err => console.log({error: err}));

    }, [])

 /* Return */
    return(
        <main id="calcsales_mini_main">
            { 
                <section id="calcsales_first_sec" onClick={handleFirstSec}>
                    <section id="header_sec">
                        <div id="sec1div1">
                            <div>
                               <p>FROM :</p>
                               <h4><em>{selectedDates.start}</em></h4>
                            </div>

                            <div>
                                <p>TO :</p>
                                <h4><em>{selectedDates.end}</em></h4>
                            </div>

                        </div>

                        <div id='year_sec'>
                            <div id='year_select'>{yearSelectTxt}</div>

                            { isYearDropdown &&
                                <div id="year_dropdown_div">
                                    <p className="year_option">2024</p>
                                    <p className="year_option">2025</p>
                                    <p>2026</p>
                                    <p>2027</p>
                                    <p>2028</p>
                                </div>
                            }

                            <button id="go_btn" disabled={selectedDates.startID == ''}>
                                Go
                            </button>

                            </div>
                    </section>

                    <div id="sec1div2">
                        <section id="weeks_sec">
                            {
                                AppendMktWeeks
                            }

                            <div id="foot_div" style={{height: '10px'}}>

                            </div>
                        </section>


                    </div>

                </section>
            }

            { calcScreen &&
                <section id="calculate_sec">
                    <div id="header">
                        <h3>N</h3>
                        <h4>Product</h4>
                        <h4>Original</h4>
                        <h4>Final</h4>
                        <h4>%Profit</h4>
                    </div>

                </section>
            }



        </main>
    )
}

export default CalcSalesComp