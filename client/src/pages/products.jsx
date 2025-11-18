import React, { useEffect, useState } from "react";
import SideBar from "../components/utils/sideBar";
import {getProducts } from '../api/productApi'

function ProductsPage() {
 /* variables */

 /* Append Data */
    const [productsData, setProductsData] = useState([])

 /* Append */
    const AppendProducts = productsData.map((it, id) => {
        return(
            <div key={id} id="products_card_div" className="prd_div">
                <p>{it.name}</p>
                <p>{it.quantity}</p>
                <p>{it.access}</p>
                <div id="img_div"></div>
                <button>Edit</button>
            </div>
        )
    } )
    

 /* FUNCTIONS */

 /* USE EFFECTS */
    useEffect(() => {
        const GETPRODUCTSFN = getProducts()
        .then(resp => resp ? setProductsData(p => (resp)) : console.log('failure'))
    }, [])

 /* return */
    return(
    <>
        <div id="sidebar_container_div">
            <SideBar header = 'Products'/>
        </div>

      { productsData.length == 0 &&
        <h1>Loading</h1>

      }

      { productsData.length >= 1 &&
        <main id="products_page_main">

            <section id="products_first_sec">

                <div id="sec1div1" className="prd_div">
                    <h4>Name</h4>
                    <h4>Count</h4>
                    <h4>Access</h4>
                    <h4>Logo</h4>
                    <h4>More</h4>
                </div>
                {
                    AppendProducts
                }
            </section>

        </main>
      }
     </>

    )
}

export default ProductsPage