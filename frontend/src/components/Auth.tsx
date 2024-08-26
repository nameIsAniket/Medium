import {Link, useNavigate} from 'react-router-dom'
import { ChangeEvent, useState } from "react"
import { SignupInput } from '@aniket_lakade/medium-common'
import { BACKEND_URL } from './../config'
import axios from 'axios'

export const Auth = ({type }: {type : "signup" | "signin"} ) => {

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : " ",
        username : " ",
        password : " "
    });
    const navigate = useNavigate();

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blog");
        }
        catch(e){
            // alert the user that is failed 
            // some pop up maybe
            alert("Error while signing up")
            console.log(e);
        }
    }


    return <div>
        <div className="flex justify-center flex-col h-screen">
            <div className='flex justify-center'>
                <div className='max-w-md'>
                    <div className="flex justify-center flex-col px-10">
                        <div className="text-3xl font-extrabold">
                            {type === "signup" ? "Create An Account" : "Login to Medium"}
                        </div>
                        <div className="text-slate-400 pt-1">
                            {type === "signup" ? "Already have an account? " : " Dont have account? "}
                            <Link className='pl2 underline' to = {type === "signup" ? "/signin" : "/signup"} >
                                {type === "signup" ? "Login" : "SignUp"}
                            </Link>
                        </div>
                    </div>
                    <div className='flex-col'>
                        {type === "signup" ? <LabelledInput label="Name" placeholder='Aniket' onChange={
                            (e) => {
                                setPostInputs({
                                    ...postInputs, // takes exitsing username and password
                                    name : e.target.value
                                })
                            }
                        } /> : null}
                        

                        <LabelledInput label="Username" placeholder='Aniket@gamil.com' onChange={
                            (e) => {
                                setPostInputs({
                                    ...postInputs, // takes exitsing username and password
                                    username : e.target.value
                                })
                            }
                        } />

                        <LabelledInput label="Password" type= {"password"} placeholder='Password' onChange={
                            (e) => {
                                setPostInputs({
                                    ...postInputs, // takes exitsing username and password
                                    password : e.target.value
                                })
                            }
                        } />
                    </div>

                    <button type="button" onClick={sendRequest} className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign in"}</button>
   
                </div>
            </div>
        </div>

    </div>
}

interface LebelledInputType {
    label : string ;
    placeholder : string ;
    onChange : ( e : ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}

function LabelledInput ({ label, placeholder, onChange, type} : LebelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">   
            {label}
        </label>

        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />

    </div>
}