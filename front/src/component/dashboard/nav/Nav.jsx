import React, { useContext } from 'react'
import { FiUser,FiUsers } from 'react-icons/fi';
import vector from "../../../img/login/Vector.svg"
import { IoStatsChartOutline } from 'react-icons/io5';
import { HiOutlineDocument } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import Logout from '../../logout/Logout';

export default function Nav() {

  const {user } = useContext(UserContext);


  return (
    <div className='navBar'>

    {
      user.rol !== "User" ?
      <>
        <img src={vector} alt="" />
          <Link to={"/user"}>
          <div className='item'>
            <FiUsers className='icon'/>
            <p>Users</p>
          </div>
          </Link>
          <div className='item'>
          <Logout class2={'icon'}/>
          </div>
       </>
          
         : 
      <>
        <Link to={"/user"}>
        <div className='item'>
        <FiUsers className='icon'/>
        <p>Users</p>
        </div>
        </Link>

        <Link to={"/stadistics"}>
        <div className='item'>
        <IoStatsChartOutline className='icon'/>
        <p>Stadistics</p>
        </div>
        </Link>


        <Link to={"/reports"}>
        <div className='item'>
        <HiOutlineDocument className='icon'/>
        <p>Reports</p>
        </div>
        </Link>

        <Link to={"/profile"}>
        <div className='item'>
        <FiUser  className='icon'/>
        <p>Profile</p>
        </div>
        </Link>

        <div className='item'>
        <Logout class2={'icon'}/>
        </div>
      </>
    
    }
    </div>
  )
}
