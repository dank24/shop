import React, { useState , useRef, useEffect, useContext} from "react";
import { MainContextEx } from "../../pages/context/mainContext";

import { useParams } from "react-router-dom";
import { getMktWeek } from "../../api/genApi";
import { getStoresMin } from "../../api/storeApi";
import { prdMovement } from "../../api/productApi";

function In_Out() {
    const {addAlert} = useContext(MainContextEx)
 /* HOOKS */
    const storeId = useParams().storeid 
    const secondDivRef = useRef(null);

 /* VARIABLES */
    const [senderDivTxt, setSenderDivTxt] = useState('OFFLOAD');
    const [toggleReciever, setToggleReceiver] = useState(false);
    const [toggleSender, setToggleSender] = useState(false);
    const [recieverDivTxt, setPeerDivTxt] = useState('choose');
    const [submitData, setSubmitData] = useState({});
    const [preview, setPreview] = useState(false);

 /* FUNCTIONS           */
    function handleSelect(e) {
        const {id, className, innerHTML} = e.target
        console.log('this:', id)

        if(id == 'select_div') setToggleSender(p => (!p));
        if(id == 'peer_div') setToggleReceiver(p => (!p));

        if(className.includes('sender')) {
            setSenderDivTxt(p => (innerHTML));
            setToggleSender(p => (false))
        };

        if(className.includes('receiver')) {
            setPeerDivTxt(p => (innerHTML));
            setToggleReceiver(p => (false))
        };

    }// first_sec_fn

    function handleInputs(e) {
        const {value, id} = e.target;
        setSubmitData(p => ({...p, [id]: Number(value)} ));

    }// handle_inputs_fn

    function handlePreview(e) {
        const {tagName, id, innerHTML} = e.target

        if(tagName == 'BUTTON') {
            if(innerHTML == 'Back') setPreview(p => (false));;

            if(innerHTML == 'Submit') {
                const sData = {
                    parties: [senderDivTxt, recieverDivTxt],
                    data: submitData
                };

                const GETMKTWEEKFN = getMktWeek()
                .then(res => sData['weekId'] = res.weekId)
                .then(ct => prdMovement(sData) )
                .then(ct => {
                    addAlert(ct.message);
                    if(ct.status == 'success') location.reload()
                } )
                .catch(err => console.log(err)) 
                 
            };

        }
    }// handle_preview_fn


    function handleBtn(e) {
        function test(str, val) {
            if(str == 'TRANSFER' && val[0] !== '-' && recieverDivTxt !== 'Offload') return `-${val}`;
            return val
        }

        if(recieverDivTxt !== 'choose')  {
            const arr = [];
            const useObj = {};

            for(let it in submitData){
                const obj = {name: it, amount: submitData[it]}
                useObj[it] = test(senderDivTxt, submitData[it])

                arr.push(obj)
            };

            console.log('this:', useObj);
            setPreviewData(p => (arr));
            setSubmitData(p => (useObj));
            setPreview(true);

        }
    }// handle_btn_fn

 /* APPEND DATA          */
    const [previewData, setPreviewData] = useState([])

    const [peerData, setPeerData] = useState([])

    const [pageData, setPageData] = useState([
        {name: 'test', id: 'PRD01'},
        {name: 'test', id: 'PRD02'},
        {name: 'test', id: 'PRD03'},
        {name: 'test', id: 'PRD04'},
        {name: 'test', id: 'PRD05'},
        {name: 'test', id: 'PRD06'},
        {name: 'test', id: 'PRD07'},
        {name: 'test', id: 'PRD08'},
        {name: 'test', id: 'PRD09'},
        {name: 'test', id: 'PRD10'},
        {name: 'test', id: 'PRD11'},
        {name: 'test', id: 'PRD12'},
        {name: 'test', id: 'PRD12'},
        {name: 'test', id: 'PRD13'},
        {name: 'test', id: 'PRD14'},
        {name: 'test', id: 'PRD15'},
        {name: 'test', id: 'PRD17'},
        {name: 'test', id: 'PRD18'},

    ])

 /* APPEND               */
    const AppendPageData = pageData.map((it,id) => {
        return(
            <div key={id} className="inout_divs" id="inout_card_div">
                <p>{id + 1}</p>
                <p>{it.name}</p>
                <input id={it.id} type="number" value={submitData[it.id]} placeholder='0' 
                    onChange={handleInputs} disabled={recieverDivTxt == 'choose' ? true : false}   
                    
                />
            </div>
        )
    })

    const AppendPreview = previewData.map((it, id) => {
        return(
            <div key={id} className="preview_divs">
                <p>{id + 1}</p>
                <p>{it.name}</p>
                <p>{it.amount}</p>
            </div>
        )
    })

    const AppendDropDown1 = peerData.map((it,id) => {
        return(
            <p key={id} className="option sender">{it.name}</p>
        )
    })
    const AppendDropDown2 = peerData.map((it,id) => {
        return(
            <p key={id} className="option receiver">{it.name}</p>
        )
    })

 /* USE EFFECTS          */
    useEffect(() => {
        const GETSTORESFN = getStoresMin()
        .then(res => res && setPeerData(p => (res)))
        .catch(err => console.log(err));
    }, [])

    console.log(peerData)

 /* RETURN */
    return(
     <>
        { pageData.length == 0 &&
            <h3>Loading</h3>

        }

        { pageData.length >= 1 && 
            <main id="inout_mini_main">

                { !preview &&
                 <>
                    <section id="inout_first_sec" onClick={handleSelect}>
                        <div className="ini">
                            <div id="select_div" className="picked">{senderDivTxt}</div>
    
                            { toggleSender &&
                                <div id="options_div">
                                    <p className="option sender">OFFLOAD</p>
                                    {
                                        AppendDropDown1
                                    }
                                </div>
                            }
                        </div> 
                            
                        <div>To</div>
    
                        <div className="ini">
                            <div id="peer_div" className="picked" >{recieverDivTxt}</div>
    
                            { toggleReciever &&
                                <div id="options_div">
                                    {
                                        AppendDropDown2
                                    }
                                </div>
                            }
                        </div> 
                    
                    </section>   

                    <section id="inout_second_sec">
                        <div className="inout_divs" id="inout_desc_div">
                            <h3>N</h3>
                            <h4>Name</h4>
                            <h4>Quantity</h4>
                        </div>

                        {
                            AppendPageData
                        }
                        <button id="submit_btn" onClick={handleBtn}>
                            Continue
                        </button>

                        <div id="footer_div"></div>
                    </section>
                 </>

                }

                { preview &&
                   < PreviewCard fn = {handlePreview} append = {AppendPreview}/>
                }


            </main>
        }


     </>
    )
}

export default In_Out

export function PreviewCard(p) {
    return(
        <section id="preview_sec" onClick={p.fn}>
            <h3>Preview</h3>
            <button id="back_btn">Back</button>

            <div id="preview_div1">
                <div className="preview_divs" id="preview_descr_div">
                    <h4>N</h4>
                    <h4>Name</h4>
                    <h4>Quantity</h4>
                </div>
                {
                    p.append
                }
            </div>

            <button id="submit_btn">Submit</button>
        </section>
    )
}