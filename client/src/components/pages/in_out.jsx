import React, { useState , useRef, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getStoresMin } from "../../api/storeApi";
import { prdMovement } from "../../api/productApi";

function In_Out() {
 /* HOOKS */
    const storeId = useParams().storeid 
    const secondDivRef = useRef(null);

 /* VARIABLES */
    const [selectDivTxt, setSelectDivTxt] = useState('RECEIVE');
    const [peerDivTxt, setPeerDivTxt] = useState('choose');
    const [togglePeer, setTogglePeer] = useState(false);
    const [submitData, setSubmitData] = useState({});
    const [toggleType, setType] = useState(false);
    const [preview, setPreview] = useState(false);

 /* FUNCTIONS           */
    function handleSelect(e) {
        const {id, className, innerHTML} = e.target

        if(id == 'select_div') setType(p => (!p));
        if(id == 'peer_div') setTogglePeer(p => (!p));

        if(className.includes('peer')) {
            setPeerDivTxt(p => (innerHTML));
            setTogglePeer(p => (false))
        }
        if(className.includes('type')) {
            setSelectDivTxt(p => (innerHTML));
            setType(p => (false))
        };
    }// first_sec_fn

    function handleInputs(e) {
        const {value, id} = e.target;
        setSubmitData(p => ({...p, [id]: value} ));

    }// handle_inputs_fn

    function handlePreview(e) {
        const {tagName, id, innerHTML} = e.target

        if(tagName == 'BUTTON') {
            if(innerHTML == 'Back') setPreview(p => (false));;

            if(innerHTML == 'Submit') {
                const sData = {
                    type: selectDivTxt,
                    parties: [storeId, peerDivTxt],
                    data: submitData
                };

                console.log(sData)
                const TRANSFEROPER = prdMovement(sData);

            };

        }
    }// handle_preview_fn
    
    function handleBtn(e) {
        function test(str, val) {
            if(str == 'TRANSFER' && val[0] !== '-' && peerDivTxt !== 'Offload') return `-${val}`;
            return val
        }

        if(peerDivTxt !== 'choose')  {
            const arr = [];
            const useObj = {};

            for(let it in submitData){
                const obj = {name: it, amount: submitData[it]}
                useObj[it] = test(selectDivTxt, submitData[it])

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
                <input id={it.id} type="number" value={submitData[it.id]} 
                    onChange={handleInputs} disabled={peerDivTxt == 'choose' ? true : false}
                    placeholder={selectDivTxt == 'RECEIVE' ? '+' : '-' } 
                    
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

    const AppendPeerData = peerData.map((it,id) => {
        return(
            <p key={id} className="option peer">{it.name}</p>
        )
    })

 /* USE EFFECTS          */
    useEffect(() => {
        const GETSTORESFN = getStoresMin()
        .then(res => res && setPeerData(p => (res)))
        .catch(err => console.log(err));
    }, [])

    console.log(submitData)

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
                            <div id="select_div" className="picked">{selectDivTxt}</div>
    
                            { toggleType &&
                                <div id="options_div">
                                    <p className="option type">RECEIVE</p>
                                    <p className="option type">TRANSFER</p>
                                </div>
                            }
                        </div> 
                            
                        <div>From</div>
    
                        <div className="ini">
                            <div id="peer_div" className="picked" >{peerDivTxt}</div>
    
                            { togglePeer &&
                                <div id="options_div">
                                    <p className="option peer">Offload</p>
                                    {
                                        AppendPeerData
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