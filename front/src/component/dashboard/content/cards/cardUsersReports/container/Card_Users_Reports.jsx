import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import { BsCalendarDate } from 'react-icons/bs';
import { GrFavorite } from 'react-icons/gr';
import { ImProfile } from 'react-icons/im';
import { AiOutlineMessage } from 'react-icons/ai';
import axios from 'axios';

import io  from "socket.io-client"
import { useRef } from 'react';





export default function Card_Users_Reports({user,rolUserLog,statusMatch}) {
  const socket = useRef()
  const path = useLocation()
  let pathRoute = path.pathname.slice(1)

  const [userOnline,setUserOnline]=useState([])
  const [online,setOnline]=useState(false)



const handleNotification = (idRte, nameRte, idDest,rolRte)=>{                                                          //de         /  para
axios.post("http://localhost:3030/api/notification/new",{idDest, Rte:{idRte, nameRte,rolRte}})
  .then(()=> "Notificacion enviada correctamente")
  .catch(error=>  console.log(error))
}

//SOCKET
useEffect(() => {
  // Se conecta Sockets
  socket.current=io("http://localhost:3030")
},[])


 useEffect(() => {    
   socket.current.emit("addUser",rolUserLog.id)
   socket.current.on("getUsers",(users) =>{
    setUserOnline(users)    
   })
 },[rolUserLog])


  useEffect(() => {
    userOnline.map(item =>{
    if( item.userId === user._id){
        setOnline(true)
    }
  })
},[userOnline])


  

  return (
    <>
{/* ------------------------------------------------ADMIN-------------------------------------------------------- */}

     {rolUserLog.rol === "User" &&
      <>
         { pathRoute==="user" ?
          <div className= {user.status==="verified" ? 'card  green-back' : 'card  red-back'  } key={user._id}>

              <div>
                  <span className=  {user.status==="verified" ?  'lineItem  green-item' :  'lineItem  red-item'  } > </span>
                  <p>Name : <span>{user.name}</span></p>
                  <p>Email : <span>{user.email}</span></p>
                  <p>Rol : <span> {user.rol} </span> </p>
                  {pathRoute==="reports" &&
                  <p>Count Matches :
                      <span> {user.match.length} </span> 
                  </p>
                  }
                  <p>Join Date : <span> 25/12/2022</span> </p>
              </div>



              <div className=  {user.status==="verified" ? 'status  green-status' : 'status  red-status'} >
                  {user.status}
                  <div className={user.status==="verified" ? 'point  green-item' :'point  red-item'}></div>
              </div>


              {/* BOTONES CRUD */}

              {pathRoute==="user" &&
                <div className="crud ">
                  <Link to={`/user/edit/${user._id}`}>
                    <div className="item-icon yellowCard ">
                      <BsPencil className="edit "/>
                    </div>
                  </Link>
                </div>
              }

          </div>
           :  
          <div className= {user.match.length ? 'card  green-back' : 'card  red-back'  } key={user._id}>
            <div>
                <span className=  {user.status==="verified" ?  'lineItem  green-item' :  'lineItem  red-item'  } > </span>
                <p>Name : <span>{user.name}</span></p>
                <p>Email : <span>{user.email}</span></p>
                <p>Rol : <span> {user.rol} </span> </p>
                <p className='text-count-list'>Count Matches : <span> {user.match.length}, </span> </p>
                <p>Join Date : <span> 25/12/2022</span> </p>
            </div>
            <div className=  {user.match.length ? 'status  green-status' : 'status  red-status'} >
                {user.match.length ? "Matched" : "No match"}
                <div className={user.match.length ? 'point  green-item' :'point  red-item'}></div>
            </div>
          </div>
         }
      </>
     }

{/* ------------------------------------------------MENTOR-------------------------------------------------------- */}

      {rolUserLog.rol === "Mentor" &&
         <div className="card" style={{"border":" solid #d2cccc 1px"}} key={user._id}>
            <div>
                <span className= "lineItem" style={{"background":"black"}} > </span>
                <p>Name : <span>{user.name}</span></p>
                <p>Email : <span>{user.email}</span></p>
                <p>Rol : <span> {user.rol} </span> </p>
                {pathRoute==="reports" &&
                <p>reason : <span> Others </span> </p> }
                <p>Join Date : <span> 25/12/2022</span> </p>

                {statusMatch &&  
                    <div className='statusOnline'>{online ?                  
                      <p className='on'>Online</p>
                       :
                      <p className='off'>Inactive</p>                    
                    }</div>
                  }                       
            </div>
       
            <div className="crud ">
                {statusMatch  ?
                  <>
                    <Link to={`/schedule/${user._id}`} className="item-icon  ">
                        <BsCalendarDate className="calendar"/> 
                    </Link>
                    
                    <div className="item-icon  "> <ImProfile className="seg_notas"/> </div>

                    <Link to={`/chat/${user._id}`} className="item-icon  ">
                        <AiOutlineMessage className="calendar"/> 
                    </Link>
                  </>
                   :
                  <div className="item-icon  "><GrFavorite className="notification"
                    onClick={()=> handleNotification(rolUserLog.id, rolUserLog.name, user._id, rolUserLog.rol)}/>
                  </div>
                }
            </div>
         </div>
      }
      
{/* -----------------------------------------------MENTEE--------------------------------------------------------- */}

     {rolUserLog.rol === "Mentee" &&
      <div className="card" style={{"border":" solid #d2cccc 1px"}} key={user._id}>
          <div>
              <span className= "lineItem" style={{"background":"black"}} > </span>
              <p>Name : <span>{user.name}</span></p>
              <p>Email : <span>{user.email}</span></p>
              <p>Rol : <span> {user.rol} </span> </p>
              {pathRoute==="reports" &&
              <p>reason : <span> Others </span> </p> }
              <p>Join Date : <span> 25/12/2022 </span> </p>

              {statusMatch &&                
                <div className='statusOnline'>{online ?          
                  <p className='on'>Online</p>              
                  :
                  <p className='off'>Inactive</p>            
              }</div> }
          </div>

          <div className="crud ">
            <div className="item-icon  ">
              { statusMatch  ?
                  <>
                    <Link to={`/chat/${user._id}`} className="item-icon  ">
                        <AiOutlineMessage className="calendar"/> 
                    </Link>
                  </>                
                  :
                  <div className="item-icon  ">
                    <GrFavorite className="notification" 
                    onClick={()=> handleNotification(rolUserLog.id, rolUserLog.name, user._id, rolUserLog.rol)}/>
                  </div>
                }
            </div>
          </div>
      </div>
     }
    </>
  )
}



