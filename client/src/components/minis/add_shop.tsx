import React, { BaseSyntheticEvent, useEffect, useState, useContext, useRef, } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import InputComp from "../utils/input";
import { add_prop } from "../../api/userApi";
import {MainContextEx} from '../../pages/context/mainContext';

function AddShopMini() {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const {addAlert} = useContext(MainContextEx);
    const navigate = useNavigate();
    
 /* variable */
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageData, setPageData] = useState({name: ''});
    const view2 = searchParams.get('view2')
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
        ['Store Name', 'Store Manager', 'Contact', 'Location'], 
        ['Manager Name', 'Email', 'Manager Phone', 'Guarantor', 'Guarantor Contact'],
        ['Product Name', 'Purchase Price', 'Retail Price', 'Quantity',]
    ])
    
    const [ids, setIds] = useState([
        ['name', 'manager', 'contact', 'location'],
        ['name', 'email', 'phone', 'guarantor', 'guarantorPhone'],
        ['name', 'purchasePrice', 'retailPrice', 'quantity']
    ])

    const [headerTxt, setHeaderTxt] = useState<string[]>([
        'Store', 'Manager', 'Product'
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
    
    console.log(pageData)

    function handleBtn(e: BaseSyntheticEvent) {
        const {innerHTML, id} = e.target

        if(id == 'Preview') {
            pageData['name'] !== '' ? (
                setSearchParams(p => ({...p, view: view, view2: 'preview'} ))
            ) : (
                addAlert('Name Field Is Empty')
            )
        }

        if(id == 'back_btn') {
            navigate(-1)
        }

        if(id == 'Create') {
            const sendData = {
                index,
                data: {...pageData}
            }
    
            const ADDFN = add_prop(sendData)
            .then(resp => {
                if(resp.status == 'success') {
                    addAlert(`Created ${headerTxt[index]} ${resp.message}`);
                    navigate(-1)

                    inputRefs.current?.forEach(inp => {
                        inp?.value && (inp.value = '')
                    });

                } else {
                    addAlert(`Failed To Create, ${resp.message} `)
                }
                
            } )
            .catch(err => console.log({error: err}) ) 
        }

    }// hanldeBtns


 /* Append */
    const AppendShopData = mega[index].map((it, id) => {
        return(
            <div key = {id} className="input_div">
                <label htmlFor={it}>{it + ' :'}</label>
                <input name={it} id={ids[index][id]} onChange={e => handleInputs(e.target)}
                    ref={(el) => {(inputRefs.current[id] = el) } }
                />
            </div>
        )
    })

    const ap = options.map((it, id) => {
        return(
            <option key={id} value={it}>{it}</option>
        )
    })

    function PreviewCard() {
        return(
            <section id="prev_sec">
                <div id="preview_items_div">
                    <button id="back_btn" onClick={handleBtn}>
                        Back
                    </button>

                    <h2>Confirm</h2>
                    {
                        mega[index].map((it, id) => {
                            return(
                                <div key={id} className="ids_divs" >
                                    <p>{it}:</p>
                                    <p>{pageData[ids[index][id]]}</p>
                                </div>
                            )
                        })
                    }

                    <button id="Create" onClick={handleBtn}>
                        Create
                    </button>

                </div>
            </section>
        )
    }

    const AopendOptions = 
        <select>{ap}</select>

/* useeffect */
    console.log('senku:', view2)

 /* return */
    return(
        <main id="dashboard_add_mini">
            { view2 !== 'preview' &&
                <>
                    <h4 id="mini_header">Create a {headerTxt[index]}</h4>

                    <div id="form_div">
                    {index == 0 &&
                        <>
                            {AppendShopData}
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
                        </>

                    }

                    {  index == 1000 &&
                        <p>Invalid redirect</p>

                    }

                    < button id="Preview" disabled={pageData.name == ''} onClick={handleBtn}>Preview</button>

                    </div>
                </>

            }

            { view2 == 'preview' &&
                < PreviewCard />

            }


        </main>
    )

}

export default AddShopMini