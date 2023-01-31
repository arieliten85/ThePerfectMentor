import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
 import {arrayHeaderSeccion} from "../header/utils/api-seccion/arrayHeaderSeccion"
 import { IoNotificationsSharp } from 'react-icons/io5';
import axios from 'axios';
import { SearchContext } from '../../../context/SearchContext';
import matchAlert from '../../../utils/sweetAlert/matchAlert';

 

export default function Header() {
  // CONTEXT
  const {user} = useContext(UserContext);
  const {setSearch} = useContext(SearchContext);
  const {isReload,reaload} = useContext(SearchContext);
  // PARAMETRES
  const path = useLocation()
  let pathRoute =  path.pathname.split("/")

  // STATES
  const [logUser,setlogUser]=useState({name:"",sub:"", sections:[]})
  const [not ,setNot]=useState({})
  const [open ,setOpen]=useState(false)
  const [changeInto, setChangeInto] = useState(false);
  const [input, setInput] = useState('');

   // FUNCTIONS
  const isActive = ()=> setOpen(!open)

 
const handleChoice = (choice, id_notification, id_user_log, id_alert)=>{
// Notification acept or not
  axios.post("http://localhost:3030/api/match/new",{choice, id_notification, id_user_log, id_alert})
  .then((res)=> {

    if(res.data === true){
      setTimeout(() => {
        isReload()
      }, 2800);
    
      matchAlert("It´s a Match!!")
    }
     
  }).catch(error => console.log(error.response))
}


// Title Section
useEffect(() => {
  if(user.rol === "User") setlogUser({name:"Admin",sub:"users", sections:["Admin","Stadistics","Reports","Profile"]});
  if(user.rol === "Mentee") setlogUser({name:"Mentee",sub:"mentores", sections:[]});
  if(user.rol === "Mentor") setlogUser({name:"Mentores",sub:"mentees", sections:[]});
}, [])


useEffect(() => {
  axios.get(`http://localhost:3030/api/user/users/${user.id}`)
  .then(res => { setNot(res.data)
  } )
}, [reaload])

//Hanblers
const handdleSearch = () =>{
  if(input){
    axios.get(`http://localhost:3030/api/user/search/${input}`)
    .then(res =>{
      setChangeInto(true)
      setSearch([res.data])
    }).catch(error => setSearch(error.response.statusText))
  }
}

const handdleClean = () =>{
  setInput("")
  setSearch(["clean"])
  setChangeInto(false)
}

const takeChangeInput = (e) => {
  setInput(e.target.value);
} 

  return (
    <div className={ !pathRoute.includes("stadistics")  &&   !pathRoute.includes("profile")  ? 'header': "headerStadistics header"} >

      <div className='notifications' onClick={isActive}>
        <IoNotificationsSharp className='icon-notificacion' />
          { not.notification !==  undefined   && 
          <>
            {/* CICULOS ROJO DE NONIFICACIONES */}

            { not.notification.length > 0 &&
              <div className='circulo'>
                <div className='number'>{not.notification.length}</div>
              </div>
            }
            {/* BOX DE NONIFICACIONES */}
            { open &&
             <ul className='box-notification' >
                {not.notification.map((item,i) =>{
                  return (
                    <li key={i}>
                      <div className='item_time'>
                        <p>{item.timestamps.substring(0,10).replaceAll("-","/")}</p>
                        <p>{item.timestamps.substring(11,16) +" hs."}</p>
                      </div>

                      <div> 
                          <p className='accept'> Acepta a <strong>{item.nameRte}</strong> como su {item.rolRte}</p>
                          <div  className='choice'>
                              <p className='yes' onClick={()=> handleChoice(true, item.idRte , user.id , item._id )}>
                              Si
                              </p>
                              <p className='no' onClick={()=>handleChoice(false,  item.idRte , user.id , item._id)}>
                              No
                              </p>

                          </div>
                        
                      </div>
                        
                    </li>
                 )})}
             </ul>
             }
          </>  
          }
      </div>
    
     {/* TITULOS SECCTION */}
      <div className='boxText'>
        { arrayHeaderSeccion.map((item,i) =>{
          return (
            pathRoute.includes(item.title.toLocaleLowerCase()) && 
            <div key={i}>
              <img className={item.class01} src={item.img_01} alt="" />
              <img className={item.class02} src={item.img_02} alt="" />
              <h2>{user.rol === "User" ? logUser.sections[i] : logUser.name}</h2>
              <h4>{item.subTitle+(pathRoute.includes("user") ? logUser.sub : "")}</h4>
          </div>
          )})}
      </div>

    {/* SEARCH BAR */}

    {  pathRoute.includes("edit") || pathRoute.includes("schedule")   ?
    
        " "
        :
        
        <>

          { ! pathRoute.includes("stadistics") &&  !pathRoute.includes("profile")  &&
          <div className='search'>
            <FiSearch className='iconSearch'/>
            <input type="text" placeholder='Search for a user by name' onChange={takeChangeInput} value={input} />
            {!changeInto ? <div className='buttonInto' onClick={ handdleSearch}>Go</div>
            :
            <div className='buttonClean' onClick={ handdleClean}>X</div>
            }
          </div>
        }

        </>
     }

  </div>
  )
}
