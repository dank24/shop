import React, { useState } from "react";
import SideBar from "../components/utils/sideBar";

function ManagersPage() {
 /* variables */

 /* Append Data */
    const [managersData, setManagersData] = useState([
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
        {name: 'Michele Olise', email: 'olise@gmail.com', phone: '07069403945', guarantor: 'MR. Okike', guarantorPhone: '07038495839'},
    ])

 /* Append */
    const appendManagersData = managersData.map((it, id) => {
        return(
            <div key={id} className="managers_card_divs">
                <section id="profile_sec">
                    <h3>{it.name}</h3>

                    <div id="img_div"></div>
                </section>

                <div>
                    <h4>Phone</h4>
                    <p>{it.phone}</p>
                </div>

                <div>
                    <h4>Email</h4>
                    <p>{it.email}</p>
                </div>

                <div>
                    <h4>Guarantor</h4>
                    <p>{it.guarantor}</p>
                </div>

                <div>
                    <h4>Contact</h4>
                    <p>{it.guarantorPhone}</p>
                </div>

            </div>  
        )
    })

 /* functions */


 /* return */
    return(
        <main id="managers_page_main">
            <div id="sidebar_container_div">
                < SideBar header='Managers' />
            </div>

            <section id="managers_first_sec">
                {
                    appendManagersData
                }
            </section>
        </main>
    )
}

export default ManagersPage