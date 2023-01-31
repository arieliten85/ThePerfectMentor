import React, { useContext } from 'react'
import {  Link,  } from "react-router-dom";
import doodle7 from "../../img/login/doodle-7.png"
import TPM from "../../img/login/Vector.svg"
import doodle5 from "../../img/login/doodle-5 .svg"
import { MdOutlineMailOutline } from 'react-icons/md';
import { TbLockOpen } from 'react-icons/tb';
import { UserContext } from '../../context/UserContext';


export default function FormLogin({handleSubmit,password,email,error}) {
  const {isAuthenticated,user } = useContext(UserContext);
  return (
    <div className="form">
      <div className="formContent">

          <div className="boxTitle">
              <img className="tpm" src={TPM} alt="The perfect mentor" />
              <img className="doodle5" src={doodle5} alt="img" />
              <img className="doodle7" src={doodle7} alt="img" />
          </div>

          <form  onSubmit={handleSubmit}>
              <div className="formBox">
                <div className="itemImg">
                  <div className="person"></div>
                  <div className="doogle5"></div>
                </div>
      
                <div className="itemForm">
                  <h1 className="">Sign in</h1>
                  <p className="line"></p>
                  <h2 className="">Hi,  {
                      isAuthenticated ?  <span>{user.name}</span> :
                      "name"
                  }</h2>

                  <div className="item-input">
                      <label className= {error.includes("email") ? "errorLavel" : ""} >
                          <MdOutlineMailOutline/>
                      </label>
                      <input className= {error.includes("email") ? "errorInput" : ""}
                      type="email" placeholder="email" {...email} />
                  </div>
                  <div className="item-input">
                      <label className= {error.includes("password") ? "errorLavel" : ""} >
                          <TbLockOpen/>
                      </label>
                      <input className= {error.includes("password") ? "errorInput" : ""}
                      type="password" placeholder="password" {...password} />
                  </div>
                  
                  <div>
                      <Link to={"/register"}>
                      <p className="textHelper">Do you forgot your password?</p>
                      </Link>
                  </div>
                  <div>
                      {error ?<p className="error">{error}</p> : ""}   
                  </div>
                </div>
              </div>
              <input  className="button" type="submit" value="Sign in"  />
          </form>
          
      </div>
    </div>
  )
}
