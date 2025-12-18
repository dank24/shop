import React, { useState, useContext } from "react";
import { PreviewCard } from "./in_out";
import { getMktWeek } from "../../api/genApi";
import { inventoryCount } from "../../api/storeApi";
import { MainContextEx } from "../../pages/context/mainContext";

function Stock(props) {
    const {addAlert} = useContext(MainContextEx)

 /* VARIABLES */
    const [preview, setPreview] = useState(false)
    const [inputData, setPageData] = useState({})
    const [previewData, setPreviewData] = useState([])
    const storeId = props.storeId

 /* FUNCTIONS */
    function handleInputs(e) {
        const {value, id} = e.target;

        setPageData(p => ({...p, [id]: value}))
    }//     handle_inputs_fn

    function handleBtn() {
        const arr = []
        for(let c in inputData) {
            let obj = {name: c, value: inputData[c]}
            if(inputData[c] == '') continue;

            arr.push(obj)
        }
        setPreviewData(p => (arr))
        setPreview(true)
    }//     handle_btn_fn

    function handlePreview(e) {
        const {innerHTML, id, tagName} = e.target;

        if(tagName == 'BUTTON') {
            if(innerHTML == 'Back') {
                setPreview(false);
            }

            if(innerHTML == 'Submit' ) {
                let sData = {
                    storeId: storeId,
                    weekId: '',
                    data: inputData,
                }

                getMktWeek()
                .then(res => {sData['weekId'] = res.weekId; console.log(res.weekId)})
                .then(ct => inventoryCount(sData))
                .then(ct1 => {
                    addAlert(ct1.message);
                    if(ct1.status == 'success') {
                        //some code
                    }
                })
                .catch(err => console.log(err))


            }
        }
    }//     handle_preview_fn 


 /* APPEND DATA */
    const [productsData, setProductsData] = useState([
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'test02', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'test03', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'test04', stk1: '50', stk2: 20, stk3: '30'},
    ])

 /* APPEND */
    const AppendProductsData = productsData.map((it, id) => {
        return(
            <div key={id} className="stock_divs">
                <p>{id}</p>
                <p>{it.name}</p>
                <p>{it.stk1}</p>
                <p>{it.stk2}</p>
                <input id={it.name} type="number" placeholder="Enter" onChange={handleInputs}
                    value={inputData[it.name]}
                />
            </div>
        )
    })

    const AppendPreview = previewData.map((it, id) => {
        return(
            <div key={id} className="preview_divs">
                <p>{id}</p>
                <p>{it.name}</p>
                <p>{it.value}</p>
            </div>
        )
    })

    console.log(inputData)
    

 /* return */
    return(
     <>
        { productsData.length == 0 &&
            <h3>Loading</h3>

        }

        { productsData.length >= 0 &&
            <main id="stock_mini_main">
             { !preview &&
              <>
                <div id="stock_decrc_div" className="stock_divs">
                    <p>N</p>
                    <p>Name</p>
                    <p>12/25</p>
                    <p>17/18</p>
                    <p>Stock</p>
                </div>

                {
                    AppendProductsData
                }

                <button onClick={handleBtn}>Continue</button>

                <div id="footer_div"></div>
              </>

             }

             { preview &&
                < PreviewCard 
                    fn = {handlePreview}
                    append = {AppendPreview}
                />

             }

            </main>

        }
     </>
    )

}

export default Stock