import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../../../../context/SearchContext';
import { UserContext } from '../../../../context/UserContext';
import { UsersDBContext } from '../../../../context/UsersDBContext';
import UsersPages from '../../../../utils/querys/UsersPges';
import CardProfile from '../cards/cardProfile/CardProfile';
import CardStadistics from '../cards/cardStadistics/CardStadistics';
import CardUsersReports from '../cards/cardUsersReports/container/Card_Users_Reports'


//SOCKET IO
//import io  from "socket.io-client"
//import { useRef } from 'react';

export default function Card_container() {
  
  //const socket = useRef()

    // Nombre de la ruta
    const path = useLocation()
    let pathLocation = path.pathname.slice(1)
    
    const arrSections=["user","reports"]
   
    // Context
    const {search,reaload} = useContext(SearchContext);
    const {user } = useContext(UserContext);
    const {page } = useContext(UsersDBContext);

    //Estados
    const [arrUsers,setArrUsers]=useState([])
    const [filterNotFoun,setFilterNotFound]=useState("")
    

    //const [userPages,setUsersPages]=useState([])

   
  // retorna el rol del usuario logeado
    const whoIam = (rol)=>{
      if(rol === "User")   return " "
      if(rol === "Mentor") return "Mentee"
      if(rol === "Mentee") return "Mentor"
    }

  // traigo los usuarios dependiendo el rol de usuario logeado
    useEffect(() => {
      UsersPages(page,whoIam(user.rol)).then(res => setArrUsers(res.data.docs))
    }, [page||reaload])


  // Barra Search
    useEffect(() => {
      if(search.includes(''))  setFilterNotFound("User not found")
      if( search.includes("clean")  ){
        UsersPages(page,whoIam(user.rol))
        .then(res =>{
          setFilterNotFound("")
          setArrUsers(res.data.docs)
        })
      }
      else{
        setArrUsers(search)
      }
      }, [search||arrUsers])


  return (
    <>

      { filterNotFoun ? 
      
        <div className='contentError'>
          <p className='page_not_found'>{filterNotFoun}</p>
        </div>

        :

        <div className='content'>
          {arrSections.map(section =>{
          return(pathLocation === section   && 
            arrUsers.map( (user_page,i) =>{
            const status = user_page.match.map(itemMatch => itemMatch.id === user.id)
            return(
                <CardUsersReports
                  userPages={arrUsers}
                  user={user_page} 
                  match={user_page.match}
                  key={i}
                  rolUserLog={user}
                  statusMatch={status.includes(true)}
                    
                />
                )
              })
            )})}
          {pathLocation==="stadistics" && <CardStadistics/> }
          {pathLocation==="profile" &&  <CardProfile/> } 

        </div>
      }
    
    </>
  )
}
