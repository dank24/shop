import React, { useEffect, useState } from "react";
import '../../assets/stylesheets/comps.css'
import { get } from "react-hook-form";

function InputComp(props) {
 /* variables */
    const [misc, setMisc] = useState({})

 /* functioons */
    function inputFunction(e) {
        props.fn('onchange', e.target)
    }

    function hanldeFocus(e, bool) {
        props.fn('focus', e.target, bool)
    }

    const styleInp = {
        border: props.bor && `1px solid ${props.bor}`
    }
 /* return */
    return(
    <main id="input_comp_main">
        <label htmlFor={props.label}>{props.label}</label>
        
        < input placeholder={props.placeholder} id={props.id} {...props.extra}
            onChange={inputFunction} name = {props.name} value={props.value}
            onFocus={e => { hanldeFocus(e, true) }} style={styleInp}
            onBlur={e => hanldeFocus(e, false) } 
        />
 
        { props.inf && props.inf !== '' &&
            <p>{props.inf}</p>
        } 
    </main>
    )

}



export default InputComp