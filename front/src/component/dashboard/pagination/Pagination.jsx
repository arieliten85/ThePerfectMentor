import React, { useContext, useEffect, useState } from 'react'
import { UsersDBContext } from '../../../context/UsersDBContext';
import { GrFormPrevious,GrFormNext } from 'react-icons/gr';
import UsersPages from '../../../utils/querys/UsersPges';
import { UserContext } from '../../../context/UserContext';

export default function Pagination() {

const {page,setPage } = useContext(UsersDBContext);
const {user } = useContext(UserContext);
const [userPages,setUsersPages]=useState([])

let total_page = userPages.totalPages
const arrNumberPage=[]

const whoIam = (rol)=>{
  if(rol === "User"){
    return " "
  }
  if(rol === "Mentor"){
    return "Mentee"
  }
  if(rol === "Mentee"){
    return "Mentor"
  }
}

useEffect(()=>{
  UsersPages(page,whoIam(user.rol))
  .then((res)=>  {
    setUsersPages(res.data)
  })
  },[page])


for (let i = 1; i <= total_page; i++) {
    const page = i;
    arrNumberPage.push(page)
}


  return (
    <div className='pagination'>
        <div className='button_prev_next' onClick={()=>setPage(userPages.prevPage)}>
          <GrFormPrevious/>
          <p>  Prev </p>
        </div>
      
        <div className='container_page'>
            {arrNumberPage.map((page,i)=>{
             return <p key={i} className= {userPages.page===page ? "number_page active" : "number_page"}
            onClick={(e)=>setPage(parseInt(e.target.innerText))}>
              
              {page}
            </p>
            })}  
       </div>

       <div className='button_prev_next' onClick={()=>setPage(userPages.nextPage)}>
         <p>  Next </p>
         <GrFormNext/>
        </div>

    </div>
  )
}
