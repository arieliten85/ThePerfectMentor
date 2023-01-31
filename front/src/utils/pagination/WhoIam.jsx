import React from 'react'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export default function WhoIam() {
  const { user } = useContext(UserContext);   


  if(user.rol === "User"){
    return " "
  }
  if(user.rol === "Mentor"){
    return "Mentee"
  }
  if(user.rol === "Mentee"){
    return "Mentor"
  }
}










