import React, { useEffect, useState } from "react";
import { fa } from "zod/v4/locales";

function CashMini() {
 /* VARIABLES */
    const [cashData, setCashData] = useState({})
    const [selectTxt, setSelectTxt] = useState('select --')
    const [displayDates, setDisplayDates] = useState(false);
    const [dateData, setDateData] = useState([]);
    const [inputData, setInputData] = useState([
        {name: 'Monday', id: 'monday'},  {name: 'Tuesday', id: 'tuesday'},
        {name: 'Wednessday', id: 'wednessday'},   {name: 'Thursday', id: 'thursday'},
        {name: 'Friday', id: 'friday'},
    ])


 /* FUNCTIONs */
    function dateFn(dateString) {
        let daysOfWeek = [];
        const targetDate = new Date(dateString || Date.now() );
        const dayId = targetDate.getDay();

        const sunday = new Date(targetDate)
        sunday.setDate(targetDate.getDate() - dayId)

        for(let i = 0; i < 7; i++) {
            let nextDay = new Date(sunday);
            nextDay.setDate(sunday.getDate() + i)
            daysOfWeek = [...daysOfWeek, nextDay.toDateString()]
        }

        return setDateData(p => (daysOfWeek))
    }// date_fn

    function handleSecOne(e) {
        const {id, innerHTML, className} = e.target

        if(id == 'selected_date') setDisplayDates(p => (!p))
        if(className == 'date_options') {
            setSelectTxt(p => (innerHTML));
            setDisplayDates(false)
        }
    }// sec_one_fn

    function handleInputs(e) {
        const {value, id} = e.target;

        setCashData(p => ({...p, [id]: value} ))
    }// handle_btn

    function handleBtn() {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        let monthIndex = months.findIndex(it => it.includes(selectTxt.substring(4,7))) + 1;
        monthIndex = String(monthIndex).padStart(2, 0)

        const date = selectTxt.substring(0,3) + ':' + ' ' + selectTxt.substring(8,10)
        + '-' + monthIndex + '-' + selectTxt.substring(13) ;

    
        const sendData = {
            date: date,
            data: {...cashData}
        }

        console.log(sendData)
    }

 /* APPEND */
    const AppendDate = dateData.map((it,id) => {
        return(
            <p key={id} className="date_options">{it}</p>
        )
    })

    const AppendSecTwo = inputData.map((it,id) => {
        return(
            <div key={id} className="input_divs">
                <label><u>{it.name}:</u></label>
                <input id={it.id} placeholder="0" type="number" onChange={handleInputs} />
            </div>
        )
    })


 /* USE EFFECTS */
    useEffect(() => {
        dateFn()
    }, [])

 /* return */
    return(
        <main id="cash_mini_main">
            <section id="cash_first_sec" onClick={handleSecOne}>
                <h2 id="header">Main Shop</h2>

                <h3>Date</h3>

                <p id="selected_date">{selectTxt}</p>

                { displayDates &&
                    <div id="options_div">
                        {AppendDate}
                    </div>
                }
                    
            </section>

            <section id="cash_second_sec">

                {
                    AppendSecTwo
                }
                <div id="total_div">
                    <label>Total:</label>
                    <input />
                </div>

                <button onClick={handleBtn}>Click</button>
                
            </section>

        </main>
    )
}

export default CashMini