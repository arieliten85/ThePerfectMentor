import React from 'react'
import doodle7 from "../../img/login/doodle-7.png"
import TPM from "../../img/login/Vector.svg"
import doodle5 from "../../img/login/doodle-5 .svg"
import { MdOutlineMailOutline } from 'react-icons/md';
import { TbLockOpen } from 'react-icons/tb';
import { FiUser } from 'react-icons/fi';
import { CgWorkAlt } from 'react-icons/cg';


export default function FormRegister({handleSubmit,name,email,password,error,rol}) {
  return (
    <div className="form">
    <div className="formContent">


        <div className="boxTitle">
            <img className="tpm" src={TPM} alt="The perfect mentor" />
            <img className="doodle5" src={doodle5} alt="img" />
            <img className="doodle7" src={doodle7} alt="img" />
        </div>

        <form onSubmit={handleSubmit}>
            <div  className="formBox">
                <div className="itemImg">
                    <div className="person"></div>
                    <div className="doogle5"></div>
                </div>
                <div className="itemForm">
                    <h1 className="">Sign Up</h1>
                    <p className="line"></p>
                    
                    <div className="item-input">
                        <label className= {error.includes("name") ? "errorLavel" : ""} >
                           <FiUser/>  
                        </label>
                        <input className= {error.includes("name")  ? "errorInput" : ""}
                       
                         type="text" placeholder="username" {...name} />
                    </div>

                    <div className="item-input">
                        <label className= {error.includes("email") ? "errorLavel" : ""} >
                        <MdOutlineMailOutline/>
                        </label>
                        <input className= {error.includes("email") ? "errorInput" : ""}
                         type="email" placeholder="email" {...email} />
                    </div>

                    <div className="item-input">
                        <label className= {error.includes("password") ? "errorLavel" : ""}>
                            <TbLockOpen/>
                        </label>
                        <input  className= {error.includes("password") ? "errorInput" : ""} 
                        type="password" placeholder="password" {...password} />
                    </div>

                    <div className="item-input" id='select'>
                        <label className= {error.includes("rol") ? "errorLavel" : ""}>
                           <CgWorkAlt/>
                        </label>
                        <select {...rol} className= {error.includes("rol") ? "errorInput" : ""} 
                         >
                            <option label="Select a Rol">Select a Rol</option>
                            <option >Mentor</option>
                            <option >Mentee</option>
                        </select>
                    </div>

        



                    
                    
                    <div>
                        {error ?<p className="error">{error}</p> : ""}
                    </div>
                

                </div>
            </div>
           <input  className="button" type="submit" value="Sign up"  />
        </form>

       
    </div>
   </div>
  )
}
