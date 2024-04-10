import { ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupInput } from '../../../common/dist/index';
import { BACKEND_URL } from '../config'

export const Auth = ({type}:{type: "signup" | "signin"}) => {
    const navigator = useNavigate()
    const [postInput, setpostInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });
    const mainUrl =`${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`
    
    async function sentRequest() {
        try{
            let response = await axios.post(mainUrl, postInput);
            const jwt = response.data.jwtToken;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            navigator("/blogs")
        }catch(e){
            <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
              Danger
            </div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <p>Something not ideal might be happening.</p>
            </div>
          </div>
        }
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <div className=" md:w-3/5">
                <div className="font-bold flex justify-center text-3xl md:text-2xl lg:text-3xl ">
                    Create an account
                </div>
                <div className="text-slate-700 flex justify-center text-sm md:text-xs lg:text-sm">
                    <div>
                        {type == "signup" ? "Already have an account?" : "Want to Create an account?"}  <Link className="pt-2 underline " to={type=="signup"?"/signin":"/signup"}>
                            {type=="signup"?"Login":"Signup"}
                        </Link>
                    </div>
                </div>
                {type === "signup" ? (
                    <Auth_Sign 
                        label="name" 
                        placeholder="Luffy Dragon Monkey" 
                        type="text"
                        onChange={(e) => {
                            setpostInput(c => ({
                                ...c,
                                name: e.target.value
                            }))
                        }} 
                    />
                ) : null}
                <Auth_Sign label="email"  placeholder="abcd@xyz.com" type="text"
                    onChange={(e)=>{
                        setpostInput(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }}
                />
                <Auth_Sign label="password" placeholder="abc@1234" type="password"
                    onChange={(e)=>{
                        setpostInput(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }}
                />
                <button type="button" onClick={sentRequest} className="mt-5 w-full text-white bg-black p-3 rounded hover:bg-zinc-900">{`${type == "signup" ? "Sign Up" : "Sing In"}`}</button>

            </div>
        </div>
    );
  
}

interface Auth_singup{
    label:string,
    placeholder:string,
    onChange: (e : ChangeEvent<HTMLInputElement>) => void,
    type: "text" | "password",
}

function Auth_Sign({label,placeholder,onChange,type}:Auth_singup ){
    return(
        <>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-1" htmlFor="name">
                    {label}
                    </label>
                    <input 
                    id={label}
                    className="shadow appearance-none border rounded w-full focus:bg-blue-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" 
                    name={label} 
                    type={type} 
                    placeholder={placeholder} onChange={onChange}
                    required
                />
        </>
    )
}