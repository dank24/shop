import React, { useEffect, useRef, useState, } from "react";
import { useParams } from "react-router-dom";

import { getBalanceWeeksForStore } from "../../api/genApi";
import { calcSales } from "../../api/storeApi";

import empySelect from '../../assets/images/icons/empty_square02.svg'
import filledSelect from '../../assets/images/icons/filled_square.svg'
import { tr } from "zod/v4/locales";

function CalcSalesComp() {
 /* HOOKS */
    const imgsRef = useRef([]);
    const storeId = useParams().storeid.toUpperCase();

 /* VARIABLES */
    const [isYearDropdown, setIsYearDropdown] = useState(false);
    const [yearSelectTxt, setYearSelectTxt] = useState('-Year');
    const [isCalcScreen, setIsCalcScreen] = useState(false);
    const [selectedTxt, setSelectedTxt] = useState('');
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
    startEnd: '',
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
                //
            break;

            case('select_img') :
                const CD = mktWeeksData[Number(id)];
                const currentIMG = imgsRef?.current[Number(id)];

                if(selectedDates.start === '') {
                    setSelectedDates(p => ({...p, startID: Number(id), start: CD.starts, startEnd: CD.ends} ))
                    imgsRef.current[Number(id)].src = filledSelect

                } else if(selectedDates.start !== '' && selectedDates.end == '') {
                    setSelectedDates(p => ({...p, endID: Number(id), end: CD.starts} ))
                    imgsRef.current[Number(id)].src = filledSelect

                } else if(selectedDates.end !== '' && selectedDates.start !== '' ) {
                    const prevEndID = selectedDates.endID;

                    if(Number(id) == selectedDates.startID ) {
                        setSelectedDates(p => ({...p, start: '', startID: ''} ));
                        imgsRef.current[Number(id)].src = empySelect;

                        return;
                    }

                    if(Number(id) == selectedDates.endID ) {
                        setSelectedDates(p => ({...p, end: '', endID: ''} ))
                        imgsRef.current[Number(id)].src = empySelect;

                        return;
                    }

                    imgsRef.current[prevEndID].src = empySelect;

                    setSelectedDates(p => ({...p, endID: Number(id), end: CD.starts} ))
                    imgsRef.current[Number(id)].src = filledSelect

                }

            break;

            default:
                null
            break;
        }

        switch(id) {
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
                .then(res => {
                    res.status == 'success' ? (
                        setCalcData(p => (res.data )),
                        setIsCalcScreen(true)
                    )
                    : (
                        console.log('failure', res)

                    )
                })
                .catch(err => console.log(err))
                
            break;

            case('back_btn'):
                setIsCalcScreen(false)

                const arr = [selectedDates.startID, selectedDates.endID]
                setTimeout(() => {
                    arr.forEach(id => {
                        imgsRef.current[id].src = filledSelect
                    })
                }, 2);

            break;

            default:
                null
            break;
        }
    }

 /* APPEND DATA */
    const [mktWeeksData, setMktWeeksData] = useState([]);
    const [yearsData, setYearsData] = useState([]);
    const [calcData, setCalcData] = useState([]);

 /* APPEND */
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

    const AppendCalc = calcData.map((it, id) => {
        return(
            <div key={id} className="calc_div">
                <h5>{String(id + 1).padStart(2,0)}</h5>
                <p>{it.name}</p>
                <p>{it.inbound.toLocaleString()}</p>
                <p>{it.outbound.toLocaleString()}</p>
                <p>{it.sold.toLocaleString()}</p>
                <p>{it.profit.toLocaleString()}</p>
            </div>
        )
    })

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

    console.log(selectedDates)
    console.log('light:', calcData)

 /* Return */
    return(
        <main id="calcsales_mini_main">
            { !isCalcScreen &&
                <section id="calcsales_first_sec" onClick={handleFirstSec}>
                    <section id="header_sec">
                        <div id="sec1div1">
                            <div>
                               <p>FROM :</p>
                               <h4><em>{selectedDates.start}</em></h4>
                            </div>

                        { selectedDates.end == '' && selectedDates.start !== '' &&
                            <div>
                                <p>TO :</p>
                                <h4><em>{selectedDates.startEnd}</em></h4>
                            </div>
                        }

                        { selectedDates.end !== '' &&
                            <div>
                                <p>TO :</p>
                                <h4><em>{selectedDates.end}</em></h4>
                            </div>
                        }


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

                            <button id="go_btn" disabled={selectedDates.startID === ''}>
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

            { isCalcScreen &&
                <section id="calculate_sec">
                    <div id="calcsec_div1">
                        <div id="def_div">
                            <div id="start_div">
                                <p>Start Date:</p>
                                <h4>{selectedDates.start.substring(4)}</h4>
                            </div>
                            
                            <div id="end_div">
                                <p>Start Date:</p>
                                <h4>{selectedDates.end.substring(4)}</h4>
                            </div>

                            <button id="back_btn" onClick={handleFirstSec}>
                                Back
                            </button>
                            
                        </div>

                        <div className="calc_div" id="header">
                            <h3>N</h3>
                            <h4>Product</h4>
                            <h4>IN</h4>
                            <h4>OUT</h4>
                            <h4>SOLD</h4>
                            <h4>%Profit</h4>
                        </div>
                    </div>

                    
                    {
                        AppendCalc
                    }

                     <div className="calc_div">
                        <h5>01</h5>
                        <p>Big-Boy 70g</p>
                        <p>5000</p>
                        <p>2500</p>
                        <p>25,000</p>
                        <p>200,000</p>
                    </div> 


                </section>
            }



        </main>
    )
}

export default CalcSalesComp