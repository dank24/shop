import React, { useState } from "react";
import SideBar from "../components/utils/sideBar";
import { appendErrors } from "react-hook-form";

function ProductsPage() {
 /* variables */

 /* Append Data */
    const [productsData, setProductsData] = useState([
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
        {name: 'Indomie -90g', quantity: '50', access: 'L0, L1'},
        {name: 'Indomie -90g', quantity: '500', access: 'L0'},
    ])

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
    

 /* functions */


 /* return */
    return(
        <main id="products_page_main">
            <div id="sidebar_container_div">
                <SideBar header = 'Products'/>
            </div>
           

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
    )
}

export default ProductsPage