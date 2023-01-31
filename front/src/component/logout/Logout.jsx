import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import { HiOutlineLogout } from 'react-icons/hi';

;

export default function Logout() {
  const {toggleAuth } = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogout = () =>{
      localStorage.clear();
      toggleAuth({})
      navigate("/login")
    }

  return (
    <HiOutlineLogout className={'icon'}  onClick={handleLogout}/>
  )
}
