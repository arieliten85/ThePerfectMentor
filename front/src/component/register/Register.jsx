
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../utils/customHooks";
import FormRegister from "./FormRegister";
import Alerta from "../../utils/sweetAlert/Alerta";
import ShowLoading from "../../utils/sweetAlert/ShowLoading"
import RegisterRequest from "../../utils/querys/RegisterRequest";


export default function Register() {
const [error,setError]=useState("")

const navigate = useNavigate();
const name = useInput();
const email = useInput();
const password = useInput();
const rol = useInput();

const dataFomr = {
name:name.value,
email:email.value,
password:password.value,
rol:rol.value
}

//Request Register
const register = async () =>{
  const {error, data } = await RegisterRequest(dataFomr)


  if(error){
    if (data.includes("Email already registered")){
     Alerta("You already have an account registered with this email", "error");
    }return setError(data)
    }
 
try{
 
  ShowLoading()
  if(!error){
  ShowLoading()
  setTimeout(() => {
  Alerta("User successfully registered", "success","");
  }, 2200);
  setTimeout(() => {
  navigate("/login");
  }, 4000);
 }
}
catch (error) {;
  console.log(error)
  }
}
const handleSubmit = (e) => {
  e.preventDefault();
 
  register()

};

//Elimina los estilos de los inputs (bordes rojos)
useEffect(() => {
if(error){
const inputs =  document.querySelectorAll("input")
const select =  document.querySelector("select")
inputs.forEach((item) => {
item.addEventListener("click",()=> {
setError("")
    })
  })
select.addEventListener("click",()=> {
setError("")
    })

}
}, [error])
 
return (
<FormRegister
handleSubmit={handleSubmit}
name={name}
email={email}
password={password}
rol={rol}
error={error}
/>
 );
}

