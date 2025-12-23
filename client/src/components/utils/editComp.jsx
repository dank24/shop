import React, { useState, useContext, use, useEffect } from "react";

import '../../assets/stylesheets/comps.css'
import { deleteItem, editItem } from "../../api/userApi";
import editIcon from '../../assets/images/icons/edit02.svg';
import deleteIcon from '../../assets/images/icons/delete02.svg';
import { MainContextEx } from "../../pages/context/mainContext";

function EditComp(props) {
 /* HOOKS */
    const {addAlert} = useContext(MainContextEx)

 /* VARIABLES */
    const [inputData, setInputData] = useState([]);
    const [editData, setEditData] = useState({})
    const [labels, setLabels] = useState([]);
    const useIN = props.useIn;
    const itemData = props.data;


 /* FUNCTIONS */
    function handleEditOpers(e) {
        let id = e.target.id;

        switch(id) {
            case('edit_operd') :
                const EditOper = editItem(itemData.id, useIN, {...editData})
                .then(res => addAlert(itemData.name + ' ' + res))
                .catch(err => console.log(err));
                
                props.fn('edit_comp', null);
            break;

            case('delete_oper') :
                const DELETFN = deleteItem(itemData.id, useIN)
                .then(res => {addAlert(itemData.name + ' ' + res.message) })
                .catch(err => console.log(err)) 

                props.fn('edit_comp', null);
            break;

            case('cancel') :
                props.fn('edit_comp', null);
            break;

            default: 
            null;
        }

    }// handle_edit_btns

    function handleInputs(e) {
        const {id, value} = e.target;
        setEditData(p => ({...p, [id]: value} ));
    }

 /* APPEND */
    const AppendEditDiv = labels.map((it, id) => {
        return(
            <div key={id} id="edit_div">
                <label><b>{it.name}:</b></label>
                <input id={it.name} defaultValue={it.label} placeholder="|" 
                    onChange={handleInputs}
                />
            </div>
        )
    })

 /* USE EFFECT */
    useEffect(() => {
        let arr = [];
        
        for(let it in itemData) {
            it !== 'id' && it !== 'cate' && (
                arr.push({name: [it], label : itemData[it]} )
            )

        }
        setLabels(p => (arr))

    }, [])
    
    

 /* RETURN */
    return(
        <main id="edit_comp_main">
            <div id="main_prompt" onClick={e => {handleEditOpers(e)}} >
                { props.cate == 'delete' &&
                    <div id="promp_delete_div">
                        <h4>
                            This Will PERMANENTLY <b style={{color: 'red'}}>DELETE</b> {props.name}
                        </h4>

                        <div>
                            <button id="delete_oper">Continue</button>
                            <button id="cancel">Cancel</button>
                        </div>
                    </div>
                }

                { props.cate == 'edit' && 
                    <div id='editinfo_div' style={{height: props.height}}>
                        <h3>Edit Information</h3>
                        
                        {
                            AppendEditDiv
                        }

                        <div id="btn_div">
                            <button id="edit_operd">Continue</button>
                            <button id="cancel">Cancel</button>
                        </div>

                    </div>

                }


            </div>
        </main>

    )
}

export default EditComp

//export
export function EditBtnsComp(props) {
    return(
        <div id="editdelet_btn_div">
            <img alt="edit" id={props.id} src={editIcon} className="edit_btn" 
                onClick={e => props.fn('edit_btn', props.data, 'edit')} width='30px' 
            />
            <img alt='del' id={props.id} src={deleteIcon} width='30px' 
                onClick={e => props.fn('edit_btn', props.data, 'delete')} className="editbtn"
            />
        </div>
    )
}

