import React, { useState , useRef, useEffect, useContext} from "react";
import { MainContextEx } from "../../pages/context/mainContext";

import { useParams } from "react-router-dom";
import { getGen } from "../../api/genApi";
import { getStoresMin } from "../../api/storeApi";
import { prdMovement } from "../../api/productApi";

function In_Out() {
 /* HOOKS */
     const {addAlert, week} = useContext(MainContextEx);
    const storeId = useParams().storeid 
    const secondDivRef = useRef(null);

    console.log(week)

 /* VARIABLES */
     const [confirmReupload, setConfirmReupload] = useState(false);
    const [toggleReciever, setToggleReceiver] = useState(false);
    const [senderDivTxt, setSenderDivTxt] = useState({name: 'OFFLOAD', id: 'OFFLOAD'});
    const [recieverDivTxt, setPeerDivTxt] = useState({name: 'choose', id: ''});
    const [toggleSender, setToggleSender] = useState(false);

    const [submitData, setSubmitData] = useState({});
    const [preview, setPreview] = useState(false);

 /* FUNCTIONS           */
    function CREATEPRDMOVEMENTOPER(confirm) {
        const sData = {
            parties: [senderDivTxt.id, recieverDivTxt.id],
            data: submitData,
            weekId: week.id,
            year: week.year,
            confirm
        };

        const CREATEPRDMVM = prdMovement(sData)
        .then(res => {
            addAlert(res.message);
            if(res.status == 'success') {
                location.reload()
            };

            if(res.status == 'duplicate') {
                setConfirmReupload(p => (true ))
            }
        })
        .catch(err => console.log(err))
        
    }

    function handleSelect(e) {
        const {id, className, innerHTML} = e.target
        console.log('this:', id)

        if(id == 'select_div') setToggleSender(p => (!p));
        if(id == 'peer_div') setToggleReceiver(p => (!p));

        if(className.includes('sender')) {
            setSenderDivTxt(p => ({name: innerHTML, id}));
            setToggleSender(p => (false))
        };

        if(className.includes('receiver')) {
            setPeerDivTxt(p => ({name: innerHTML, id}));
            setToggleReceiver(p => (false))
            console.log('reciever:', id)
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
                CREATEPRDMOVEMENTOPER()
            };

        }
    }// handle_preview_fn

    function handleReupload(e) {
        const {id, className} = e.target;

        switch(id) {
            case('yes_btn'):
                CREATEPRDMOVEMENTOPER(true)
            break;

            case('no_btn'):
                setConfirmReupload(p => false);
            break;

            default:
                null;
            break
        }

    }// handlereupload_fn

    function handleBtn(e) {
        if(recieverDivTxt.name !== 'choose')  {
            const arr = [];

            for(let it in submitData){
                const obj = {name: it, amount: submitData[it]}

                arr.push(obj)
                console.log('item')
            };

            setPreviewData(p => (arr));
            setPreview(true);

        }
    }// handle_btn_fn

    console.log('this:', submitData);
    

 /* APPEND DATA          */
    const [previewData, setPreviewData] = useState([])

    const [peerData, setPeerData] = useState([])

    const [pageData, setPageData] = useState([
        //{name: 'test', id: 'PRD01'},
    ])

 /* APPEND               */
    const AppendPageData = pageData.map((it,id) => {
        return(
            <div key={id} className="inout_divs" id="inout_card_div">
                <p>{id + 1}</p>
                <p>{it.name}</p>
                <input id={it.id} type="number" value={submitData[it.id]} placeholder='0' 
                    onChange={handleInputs} disabled={recieverDivTxt.name == 'choose' ? true : false}   
                    
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
            <p key={id} className="option sender" id={it.id}>{it.name}</p>
        )
    })

    const AppendDropDown2 = peerData.map((it,id) => {
        return(
            <p key={id} className="option receiver" id={it.id}>{it.name}</p>
        )
    })

 /* USE EFFECTS          */
    useEffect(() => {
        const GETSTORESFN = getStoresMin()
        .then(res => res && setPeerData(p => (res)))
        .catch(err => console.log(err));
 
        const GETPRODUCTSFN = getGen(2)
        .then(res => setPageData(res))
        .catch(err => console.log(err))
    }, [])


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
                            <div id="select_div" className="picked">{senderDivTxt.name}</div>
    
                            { toggleSender &&
                                <div id="options_div">
                                    <p className="option sender" id='OFFLOAD'>OFFLOAD</p>
                                    {
                                        AppendDropDown1
                                    }
                                </div>
                            }
                        </div> 
                            
                        <div>To</div>
    
                        <div className="ini">
                            <div id="peer_div" className="picked" >{recieverDivTxt.name}</div>
    
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
                <>
                    { confirmReupload && 
                        <section id="confirm_reupload_sec" onClick={handleReupload}> 
                            <div>
                                <h4>
                                    A Product Movement Entry From <b id="b1">{senderDivTxt.name}</b> To <b id='b2'>{recieverDivTxt.name.toUpperCase()}</b> for This Week Exists, <b id='b3'>OVERWRITE?</b>
                                </h4>

                                <div id="btn_div">
                                    <button id='yes_btn'>YES</button>
                                    <button id="no_btn">NO</button>
                                </div>         
                                </div>
   
                        </section>
                    }
                    < PreviewCard fn = {handlePreview} append = {AppendPreview}/>   
                </>
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