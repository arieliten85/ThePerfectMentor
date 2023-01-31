import React from "react";
import { Link } from "react-router-dom";
import doodle7 from "../../img/login/doodle-7.png"
import Saly from "../../img/login/Saly-1.svg"
import TPM from "../../img/login/Vector.svg"
import doodle5 from "../../img/login/doodle-5 .svg"


export default function Home() {
  return (
   
    <div className="form">
      <div id="Home">
        <div className="itemHome">
            <div>
                <img className="tpm" src={TPM} alt="The perfect mentor" />
            </div>
            <form className="box"  onSubmit={"handleSubmit"}>
              <div className="formBoxHome">
                  <img src={Saly} alt="" />
                  <img className="doodle5" src={doodle5} alt="img" />
                  <img className="doodle7" src={doodle7} alt="img" />
              </div>
              <Link to={"/register"}>
                  <div className="button">Sing up</div>
              </Link>
              <Link to={"/login"}>
                  <div className="button reg"><p>Log in</p></div>
              </Link>
            </form>
        </div>
      </div>
    </div>  
 
  );
}