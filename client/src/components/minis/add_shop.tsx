import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import InputComp from "../utils/input";
import { add_prop } from "../../api/userApi";

function AddShopMini() {

 /* variable */
    
    const [searchParams, setSearchParams] = useSearchParams()
    const [pageData, setPageData] = useState({})
    const view = searchParams.get('view')
    let index: number = 1000;

    switch(view) {
        case 'add_store': 
            index = 0; break;
        case 'add_manager': 
            index = 1; break;
        case 'add_product':
            index = 2; break;
        default:
            index = 1000; break;
    }


 /* append data */
    const [mega, setMega] = useState([
        ['Store Name', 'Shop Manager', 'Contact', 'Location'], 
        ['Manager Name', 'Email', 'Manager Phone', 'Guarantor', 'Guarantor Contact'],
        ['Product Name', 'Price', 'Quantity',]
    ])
    
    const [ids, setIds] = useState([
        ['name', 'manager', 'contact', 'location'],
        ['name', 'managerEmail', 'managerPhone', 'guarantor', 'guarantorPhone'],
        ['name', 'price', 'quantity']
    ])

    const [headerTxt, setHeaderTxt] = useState<string[]>([
        'Shop', 'Manager', 'Product'
    ])

    const [shopData, setShopDate] = useState<string[]>([
        'Shop Name', 'Shop Manager', 'Contact', 'Location'
    ])
    const [options, setOptions] = useState([
        'lv0', 'lv1', 'lv2'
    ])

 /* functions */
    function handleInputs(e: HTMLInputElement) {
        const {name, id, className, value} = e;
        setPageData(p => ({...p, [id]: value } ));
        
    }// handleInputs

    function handleBtn(e: BaseSyntheticEvent) {
        const sendData = {
            index,
            data: {...pageData}
        }

        const ADDFN = add_prop(sendData)
        .then(resp => console.log('fon'))
    }// hanldeBtns

    console.log(pageData)


 /* Append */
    const AppendShopData = mega[index].map((it, id) => {
        return(
            <div key = {id} className="input_div">
                <label htmlFor={it}>{it + ' :'}</label>
                <input name={it} id={ids[index][id]} onChange={e => handleInputs(e.target)} />
            </div>
        )
    })

    const ap = options.map((it, id) => {
        return(
            <option key={id} value={it}>{it}</option>
        )
    })

    const AopendOptions = 
        <select>{ap}</select>


/* useeffect */
    useEffect(() => {

    }, [index])

 /* return */
    return(
        <main id="dashboard_add_mini">

            <h3 id="mini_header">Add A {headerTxt[index]}</h3>

            <div id="form_div">
            {index == 0 &&
                <>
                    {AppendShopData}
                    {AopendOptions}
                </>
            }

            {  index == 1 &&
                <>
                    {AppendShopData}
                </>

            }

            {  index == 2 &&
                <>
                    {AppendShopData}
                    {AopendOptions}
                </>

            }

            {  index == 1000 &&
                <p>Invalid redirect</p>

            }

            < button onClick={handleBtn}>Submit</button>

            </div>


        </main>
    )

}

export default AddShopMini