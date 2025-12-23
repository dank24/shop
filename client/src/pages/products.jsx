import React, { useEffect, useState } from "react";

import EditComp, {EditBtnsComp} from "../components/utils/editComp";
import SideBar from "../components/utils/sideBar";
import {getProducts } from '../api/productApi'

function ProductsPage() {
 /* variables */

 /* Append Data */
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

 /* FUNCTIONS */
    const sideBarFns = {
        "FN1": () => {
            setIsEditVisible(p => (!p ));
        }
    }

    function handleEditBtns(clas, re, cate) {
        if(clas == 'edit_btn') {
            setSelectedData(p => ({...re, cate}))
        }

        if(clas == 'edit_comp'){
            setSelectedData(re);
            getStoresData()
        }

    }// handle_edit_fn
    console.log('this:', selectedData)


 /* Append */
     const AppendProducts = productsData.map((it, id) => {
        return(
            <div key={id} id="products_card_div" className="prd_div">
                <p>{it.name}</p>
                <div id="img_div"></div>
                <p>{it.quantity}</p>
                <p>{it.price}</p>
                <p>{it.access}</p>

                { isEditVisible && 
                    <div id="editbtns_cont">
                        < EditBtnsComp 
                            data = {it}  fn = {handleEditBtns}
                            id = {it.id}
                        />
                    </div>
                }

            </div>
        )
    } )
    

 /* USE EFFECTS */
    useEffect(() => {
        const GETPRODUCTSFN = getProducts()
        .then(res => {setProductsData(p => (res)); setLoading(false) })
        .catch(err => console.log(err));
    }, [])

 /* return */
    return(
    <>
        { selectedData !== null &&
            <EditComp 
                fn = {handleEditBtns} useIn = {2} cate = {selectedData.cate}
                name = {selectedData.name} data = {selectedData}
            />

        }

        <div id="sidebar_container_div">
            <SideBar 
                header = 'Products' fn1 = {sideBarFns.FN1}
                fn1Btn = 'Edit' 
            />
        </div>

      { loading &&
            <h1>Loading</h1>
      }

      { !loading && productsData.length == 0 &&
            <h4>Nothing to see here</h4>
      }

      { !loading && productsData.length >= 1 &&
        <main id="products_page_main">

            <section id="products_first_sec">

                <div id="sec1div1" className="prd_div">
                    <h4>Name</h4>
                    <h4>Logo</h4>
                    <h4>Count</h4>
                    <h4>Price</h4>
                    <h4>Acc.</h4>

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