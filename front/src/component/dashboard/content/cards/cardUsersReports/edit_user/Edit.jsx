
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useInput from '../../../../../../utils/customHooks';
import GetOneUser from '../../../../../../utils/querys/GetOneUser';
import UpdateUser from '../../../../../../utils/querys/UpdateUser';
import UserDelete from '../../../../../../utils/querys/UserDelete';
import ShowLoading from "../../../../../../utils/sweetAlert/ShowLoading"
import Header from '../../../../header/Header';
import Nav from '../../../../nav/Nav';

import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Edit() {
 const {id}=useParams()
 //hooks
const navigate = useNavigate()
const name = useInput();
const email = useInput(); 
const rol = useInput(); 


const [userOne, setUserOne]=useState({});


useEffect(() => {
  GetOneUser(id)
  .then(res => setUserOne(res.data))
  .catch(err => console.log(err))
}, [id])



const handleEdit = (e) => {
        e.preventDefault();

        ShowLoading()

        UpdateUser(id,{
          name: name.value || userOne.name,
          email:email?.value || userOne.email,
          rol:rol?.value || userOne.rol,
        })
        .then(() => {
          setTimeout(() => {
            navigate("/user")
          }, 2000);
         
         
        })
        .catch(error=> console.log(error))
       

       
     
 }
 
 
 const handleDelete = () => {

  ShowLoading()
  UserDelete(id)

  setTimeout(() => {
    navigate("/user")
  }, 2000)


 }
 





  return (

    <>
      <Header/>
        <form onSubmit={handleEdit}>

        <div className='formEdit'>
            <h2>EDIT</h2>
           
            
                  <RiDeleteBin6Line  className='button_delete'  onClick={()=>  handleDelete(id)}/>
             
          

            <input  type="text" placeholder={userOne.name} {...name}  />
            <input  type="email" placeholder={userOne.email} {...email} />
            <input  type="rol" placeholder={userOne.rol}  {...rol} />


            <input  className="button" type="submit" value="Edit"  />
            <Link to={"/user"}>
               <p  className="button back"  >back</p>
            </Link>
       
     
        </div>
  
    
      <Nav/>
    </form>
    </>

  
  )
}
