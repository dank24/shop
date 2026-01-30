import React, { useEffect, useState } from "react";
import '../../assets/stylesheets/comps.css'
import { getInventoryCounts } from "../../api/storeApi";

function ViewStockCounts() {
 /* VARIABLES */
    const [prddCountData, setPrdsCountData] = useState([
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },
        {
            "name": "testPrd",
            "counts": [
                50,
                0, 10, 20, 50, 50, 60, 100, 2000, 100, 1000, 60
            ]
        },

    ])
    const [headers, setHeaders] = useState(['N', 'Name', '06', '09', '10', '11', '12', '12', '11', '24', '25', '26' ])

 /* APPEND */
    const AppendHeaders = headers.map((it, id) => {
        return(
            <h3 key={id} className="headers">{it}</h3> 
        )
    })

    const AppendPrdCounts = prddCountData.map((it, id) => {
        return(
            <div key={id} className="prdcount_div append_divs">
                <p>{id}</p>
                <p>{it.name}</p>
                {
                    it.counts.map((its, ids) => {
                        return(
                            <p key={ids}>{its}</p>
                        )
                    })
                }
            </div>
        )
    })

 /* USE EFFECT */
    useEffect(() => {
        const GETCOUNTS = getInventoryCounts()
        .then(res => {
            console.log(res)
            //setPrdsCountData(p => ([...p, ...res.prdCounts] ));
        })
    
    }, [])

    console.log('headers:', prddCountData)


 /* RETURN */
    return(
     <main id="viewstkcount_mini_main">
     { prddCountData.length == 0 &&
        <div>Loading</div>

     }
    
     { prddCountData.length > 0 &&
      <>
        <section id="viewstk_first_sec">
            <div className="header_div append_divs">
                {
                    AppendHeaders
                }
            </div>

            {
                AppendPrdCounts
            }

            <div id="footer_div">
            </div>
        </section>


      </>


     }

     </main>

    )
}

export default ViewStockCounts