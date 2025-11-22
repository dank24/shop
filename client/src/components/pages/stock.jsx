import React, { useState } from "react";
import { PreviewCard } from "./in_out";

function Stock() {
 /* VARIABLES */
    const [preview, setPreview] = useState(false)
    const [pageData, setPageData] = useState({})

 /* FUNCTIONS */
    function handleInputs(e) {
        const {value, id} = e.target;

        setPageData(p => ({...p, [id]: value}))
    }

    function handlePreview(e) {
        const {innerHTML, id, tagName} = e.target;

        if(tagName == 'BUTTON') {
            innerHTML == 'Back' && setPreview(false);
        }
    }   

 /* APPEND DATA */
    const [productsData, setProductsData] = useState([
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
        {name: 'testPrd', stk1: '50', stk2: 20, stk3: '30'},
    ])

 /* APPEND */
    const AppendProductsData = productsData.map((it, id) => {
        return(
            <div key={id} className="stock_divs">
                <p>{id}</p>
                <p>{it.name}</p>
                <p>{it.stk1}</p>
                <p>{it.stk2}</p>
                <input id={id} type="number" placeholder="Enter" onChange={handleInputs}/>
            </div>
        )
    })
    console.log(pageData)
    

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

                <button onClick={e =>  setPreview(true)}>Continue</button>

                <div id="footer_div"></div>
              </>

             }

             { preview &&
                < PreviewCard fn = {handlePreview}/>

             }

            </main>

        }
     </>
    )

}

export default Stock