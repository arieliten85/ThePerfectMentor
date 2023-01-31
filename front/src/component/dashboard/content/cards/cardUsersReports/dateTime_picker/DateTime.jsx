import React, {useState } from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { Link } from "react-router-dom";
import Header from "../../../../header/Header";
registerLocale('es', es)

export default function DateTime() {
  const [startDate, setStartDate] = useState(new Date());

  return ( 
    <>
      <Header/>
      <form className="formSchudele" onSubmit={"handleSchedule"}>
        <div className="schudele">
          <div>
              <h2>Schedule your interview</h2>
          </div>
          <div className="dateTime">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              locale="es"
              showTimeSelect
              dateFormat="Pp"
              inline
              className="dateTime"
              />
          </div>
            <input  className="button" type="submit" value="Edit"  />
            <Link to={"/user"}>  <p  className="button back"  >back</p>   </Link>
        </div>
      </form>
    </>     
 )
}

