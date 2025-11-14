import React, { BaseSyntheticEvent, useEffect, useState, useRef, useContext } from "react";
import {replace, useNavigate } from 'react-router-dom'
import useForm from 'react-hook-form';
import {email, number, z} from 'zod';

import { MainContextEx } from "./context/mainContext";
import { register } from "../api/userApi";

import '../assets/stylesheets/pages.css';
import InputComp from '../components/utils/input';
import ButtonComp from '../components/utils/buttons'

const loginFormSchema = z.object({
    name: z.string().min(5, 'name must have minimum of 5 character'),
    email: z.string().email('not an email'),
    password: z.string().min(6, 'password must longer than 6')
});

type loginFormType = z.infer< typeof loginFormSchema>;
interface inputFieldTy {field: String, info?: String, isValid?: boolean, bor?: String};
interface checkTy {name: RegExp, email?: RegExp}

function RegisterPage() {
    const navigate = useNavigate();
 /* variable              */
    const [inputData, setInputData] = useState<loginFormType>({name: '', email: '', password: ''});
    const [errorTxt, setErrorTxt] = useState<string>('')
    const [isFocused, setIsFocused] = useState('');

 /* Append Data            */
    const [inputFields, setInputFields] = useState<inputFieldTy[]>([
        {field: 'name', info: 'username must be between 4 to 29 characters long', isValid: false},
        {field: 'email', info: 'must be in the form of an email', isValid: false,},
        {field: 'password', info: 'must have a symbol a small and a cpital letter', isValid: false}
    ])

 /* functions            */
    function handleInputs(fo: string, e: HTMLInputElement, bool: boolean) {
        const {value, id, className, name, focus, blur} = e

        if(fo == 'onchange') {            
            setInputData(p => ({...p, [name]: value} ));
            value !== '' && (
                checkInput(Number(id), value, name)

            )
        }
        
        if(fo == 'focus'){
            bool && setIsFocused(p => (name ))

            !bool && setIsFocused(p => (''))
        }
    }//

    function checkInput(field: number, val: string, name: string) {
        let re: inputFieldTy;
        let c: boolean;

        const checkRegex = {
            name: /^[a-zA-Z][a-zA-Z0-9-_]{3,29}$/
        }

        val == 'onblur' ? c = true : c = checkRegex['name'].test(val)

        //console.log('59:', checkRegex['name'].test(val))

        !c ? (
            re = {...inputFields[field], isValid: false, bor: 'red'}
        ) : (
            re = {...inputFields[field], isValid: true, bor: 'black'}
        )

        let obj = [...inputFields]
        obj[field] = re

        setInputFields(p => (obj ))

    }//

    function handleBtn(e: BaseSyntheticEvent) {
        e.preventDefault();
        let validCount: number = 0;
        let arr = [...inputFields];

        for(let i = 0; i < inputFields.length; i++){

            if(arr[i].bor == undefined || arr[i].bor == 'red') {
                let inp = {...arr[i]};
                inp.bor = 'red', inp.isValid = true;
                arr[i] = inp;

            } else {
                validCount = validCount +  1
            }
        }
        setInputFields(p => (arr))


        if(validCount == 3) {
            const REGISTERFN = register(inputData)
            .then(res => {
                localStorage.setItem('token', res);
                navigate('/home', {replace: true})
            })
            .catch(err => console.log(err)) 
        
        } else {
            setErrorTxt(p => ('Highlighted fields are not valid'))
        }
    }//

 /* Appends              */
    const AppendInputs = inputFields.map((inp, id) => {
        return < InputComp 
            key = {inp.field} fn = {handleInputs } name = {inp.field} id = {id}
            label = {inp.field} placeHolder = {inp.field} value = {inputData[`${inp.field}`]}
            inf = {isFocused == inp.field && !inp.isValid ? inp.info : '' } 
            bor = {inp.bor && inp.bor}
        />
    })

 /* useEffects          */
    useEffect(() => {

    }, [inputData])

 /* return                */
    return(
        <main id="login_page_main">
            <section id="login_form_sec">
                <h2>Create An Account</h2>

                { errorTxt !== '' &&
                    <p id="error_msg">{errorTxt}</p>
                }

                {
                    AppendInputs
                }
                < ButtonComp 
                    txt = 'click me'
                />

                <button style={{height: '50px', width: '40px'}} onClick={handleBtn}>click</button>
            </section>
        </main>
    )
}


export default RegisterPage