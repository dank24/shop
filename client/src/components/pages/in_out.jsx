import React, { useState , useRef} from "react";

function In_Out() {
 /* HOOKS */
    const secondDivRef = useRef(null);

 /* VARIABLES */
    const [selectDivTxt, setSelectDivTxt] = useState('Receive');
    const [peerDivTxt, setPeerDivTxt] = useState('choose');
    const [togglePeer, setTogglePeer] = useState(false);
    const [submitData, setSubmitData] = useState({});
    const [toggleType, setType] = useState(false);
    const [preview, setPreview] = useState(true);

 /* FUNCTIONS */
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

        setSubmitData(p => ({...p, [id]: value} ))
    }// handle_inputs_fn

    function handlePreview(e) {
        const {tagName, id, innerHTML} = e.target

        if(tagName == 'BUTTON') {
            if(innerHTML == 'Back') setPreview(p => (false));

            if(innerHTML == 'submit') {
                //submit function
            }
        }
    }// handle_preview_fn
    


 /* APPEND DATA */
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

    const [previewData, setPreviewData] = useState([
        {name: 'testprd', quantity: '100'},
     
    ])

 /* APPEND */
    const AppendPageData = pageData.map((it,id) => {
        return(
            <div key={id} className="inout_divs" id="inout_card_div">
                <p>{id + 1}</p>
                <p>{it.name}</p>
                <input id={it.id} type="number" placeholder="0" onChange={handleInputs} />
            </div>
        )
    })

    const AppendPreview = previewData.map((it, id) => {
        return(
            <div key={id} className="preview_divs">
                <p>{id + 1}</p>
                <p>{it.name}</p>
                <p>{it.quantity}</p>
            </div>
        )
    })

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
                                    <p className="option type">Receive</p>
                                    <p className="option type">Transfer</p>
                                </div>
                            }
                        </div> 
                            
                        <div>From</div>
    
                        <div className="ini">
                            <div id="peer_div" className="picked" >{peerDivTxt}</div>
    
                            { togglePeer &&
                                <div id="options_div">
                                    <p className="option peer">Main Shop</p>
                                    <p className="option peer">Peak Shop</p>
                                    <p className="option peer">Powa Shop</p>
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
                        <button id="submit_btn" onClick={e => setPreview(true)}>Continue</button>

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

console.log('fuck')
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