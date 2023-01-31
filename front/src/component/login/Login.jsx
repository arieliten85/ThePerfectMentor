import React, {useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../utils/customHooks";
import FormLogin from "./FormLogin";
import ShowLoading from "../../utils/sweetAlert/ShowLoading";
import Alerta from "../../utils/sweetAlert/Alerta";
import { UserContext } from "../../context/UserContext";
import LoginRequest from "../../utils/querys/LoginRequest";


export default function Login() {

const {checkToken } = useContext(UserContext);

//hooks
const navigate = useNavigate()
const password = useInput();
const email = useInput(); 

//states
const [error,setError]=useState("")
//objetos
const userLogin = {
email:email.value,
password:password.value }

//Request Login
const login = async () =>{
const {error, data } = await LoginRequest(userLogin)


try{
  if(error){
  if (data.includes("User not found")){
  return  Alerta("User not found, create a new account", "error");
  }return setError(data)
  }
  if(!error){
    ShowLoading()
    checkToken(data.token)

    window.localStorage.setItem("user", JSON.stringify(data));
  }
  setTimeout(() => {
  Alerta("Successful operation", "success","It's nice to have you back");
  }, 2200);

  setTimeout(() => {
  navigate("/user");
  }, 4000);
}
catch (error) {;
  console.log(error)
}
}

//Accion Boton
const handleSubmit = (e) => {
  e.preventDefault();
  login()
 }
//Elimina los stylos de los inputs (bordes rojos)
useEffect(() => {
  if(error){
  const inputs =  document.querySelectorAll("input")
  inputs.forEach((item) => {
  item.addEventListener("click",()=> {
  setError("")
      })
    })
 }
}, [error])

return (
  <FormLogin
  handleSubmit={handleSubmit}
  password={password}
  email={email}
  error={error}
  />
 )
}












 