import React, { useEffect, useState, } from "react";
import { useParams } from "react-router-dom";

import { getYears, getMktWeeks, getBalanceSelections, getBalanceWeeksForStore } from "../../api/genApi";
import { calcSales } from "../../api/storeApi";
import { ar } from "zod/v4/locales";

function CalcSalesComp() {
 /* HOOKS */
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
/*         {
            "starts": "Sun Mar 02 2025",
            "ends": "Sat Mar 08 2025",
            "week": "week 10",
            "year": 2026,
            'id': 'WK-01-02'
        }, */
    ])
    const [selectedDates, setSelectedDates] = useState({
        startData: '',
        endData: '',
        start: '',
        end: ''
    })


 /* Functions */
    const handleFirstSec = (e) => {
        const {id, className, innerHTML, name} = e.target;

        switch(className) {
            case('display_date_div') : 
                setIsDropDownVisible(p => (true ));
                setSelectedTxt(p => (id ))
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
            break;

            case('prev') : 
                setPage(p => (p - 11))
            break;

            case('year_select') :
                setIsYearDropdown(p => (!p ))
            break;

            default:
                null
            break;
        }
    }

    console.log('light:', yearsData)

 /* Append */
    const AppendYearsData = yearsData.map((it, id) => {
        return(
            <p key={id} className="year_option">{it}</p>
        )
    });

    const AppendMktWeeks = mktWeeksData.filter((it, id) => id >= page && id < page + 11)
    .map((it, id) => {
        return(
            <div key={id} id={it.id} className="mkt_week_option">
                <h3>{it.week}</h3>
                <p className="date_p">{it.starts.substring(4)}</p>
                <p className="date_p">-</p>
                <p className="date_p">{it.ends.substring(4)}</p>
            </div>
        )   
    });

    function AppendSelectDropdown() {
        return(
            <div id="dropdown_div" onClick={handleFirstSec}>
                <section>
                    <h2 id="close_x">X</h2>

                    <section id="header_sec">
                        <div id="year_select">{yearSelectTxt}</div>

                        { isYearDropdown &&
                            <div id="year_dropdown">
                                {
                                    AppendYearsData
                                }
                            </div>
                        }

                        <h3>Select {selectedTxt} Date</h3>
                    </section>

                    {
                        AppendMktWeeks
                    }

                    <section id="paging_div">
                        {page > 0 && <h4 id="prev">Prev</h4> }
                        <div id="info">{page}/{mktWeeksData.length}</div>
                        {mktWeeksData.length >0 && <h4 id="next">next</h4> }
                    </section>

                </section>


            </div>
        )
    };


 /* USE EFFECT */
    useEffect(() => {
        const GETBALANCEWEEKSOPER = getBalanceWeeksForStore(storeId)
        .then(res => {
            res.status == 'success' && (
            setDbWeeks(p => ([...p, ...res.data])) );
            return res.data
        } )
        .then(ct => {
            const filtYear = ct.reduce(
                (acc, current) => {
                    if(!acc.includes(current.year)) {acc = [...acc, current.year] }
                    return acc
                }, []
            ).sort((a,b ) => a - b )

            setYearsData(p => (filtYear ))
        })

        let years = [];

        dbWeeks.map((week, index) => {
            index == 0 && years.push(week.year);
            week.year !== years[years.length - 1] && years.push(week.year);
        })

        setYearsData(p => (years.sort((a, b) => a - b) ))

    }, [])
    

 /* Return */
    return(
        <main id="calcsales_mini_main">

            { isDropdownVisible &&
                < AppendSelectDropdown />
            }

            { 
                <section id="calcsales_first_sec" onClick={handleFirstSec}>
                    <div id="sec1div1">
                        <h3>Start Week:</h3>
                        <div className="display_date_div" id="Start">{selectedDates.start}</div>
                    </div>

                    <div id="sec1div2">
                        <h3>End Week:</h3>
                        <div className="display_date_div" id="End">{selectedDates.end}</div>
                    </div>

                    <button id="submit_btn">
                        SUBMIT
                    </button>

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