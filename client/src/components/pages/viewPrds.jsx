import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsViaAccess } from "../../api/productApi";

import '../../assets/stylesheets/comps.css'

function ViewProducts() {
    const storeId = useParams().storeid;

 /* APPEND DATA */
    const [productsData, setProductsData] = useState([
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'},
        {name: 'Indomie -90g', quantity: '2300', price: '23,000'}
    ])

 /* APPEND */
    const AppendProducts = productsData.map((it, id) => {
        return(
            <div key={id} className="viewprd_prd_card" id="prd_card">
                <p>{id}</p>
                <h4>{it.name}</h4>
                <p>{it.quantity}</p>
                <p>#{it.price}</p>
            </div>
        )
    })

 /* USE EFFECTS */
    useEffect(() => {
        console.log('ran')
    }, [])

 /* Return */
    return(
     <>
      { productsData.length == 0 &&
        <h2>Loading Products overview</h2>
      }

      { productsData.length >= 1 &&
        <main id="viewprd_mini_main">
            <section id="viewprd_first_sec">
                <div className="viewprd_prd_card" id="prdview_sec1div1">
                    <p>N</p>
                    <h3>Name</h3>
                    <h3>Quantity</h3>
                    <h3>Price</h3>
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

export default ViewProducts
