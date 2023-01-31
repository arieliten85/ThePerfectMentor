import React, { useEffect, useState } from 'react'
import AllUsers from '../../../../../../utils/querys/AllUsers';

export default function Stadistics_user() {
  const [userStadistics, setUserStadistics] = useState([]);
  const [arrMentors, setArrMentors] = useState([]);
  const [arrMentees, setArrMentees] = useState([]);
  const [newMentors, setNewMentors] = useState([]);
  const [newMentees, setNewMentees] = useState([]);
  
  
  useEffect(() => {
    AllUsers().then((res)=>  setUserStadistics(res.data))
  }, [])

  useEffect(() => {
    const arr_mentors = userStadistics.filter(item => item.rol === "Mentor")
    setArrMentors(arr_mentors)

    const arr_mentees = userStadistics.filter(item => item.rol === "Mentee")
    setArrMentees(arr_mentees)
        
    // adelanto de 3hs bug time
    let today = new Date().toISOString().substring(0,10)
    const hoy = userStadistics.filter(item => item.date.substring(0,10) === today )

    const new_mentors = hoy.filter(item => item.rol === "Mentor")
    setNewMentors(new_mentors)
    const new_mentees = hoy.filter(item => item.rol === "Mentee")
    setNewMentees(new_mentees)
        
}, [userStadistics])
  
   
  return (
    <div className='container_text'>
        <div className='box_total_user'>
          <div>
            <h3>TOTAL OF USERS</h3>
          </div>

          <div className='item'>
            <h4>Mentese</h4>
            <span>{arrMentees.length}</span>
          </div>

          <div className='item'>
            <h4>Mentores</h4>
            <span>{arrMentors.length}</span>
          </div>

          <div className='item'>
            <h5>Total users</h5>
            <span>{arrMentors.length+arrMentees.length}</span>
          </div>

        </div>

        <div className='box_new_user'>
          <div>
            <h3>NEW USERS</h3>
          </div>

          <div className='item'>
            <h4>New mentees</h4>
            <span>{newMentees.length}</span>
          </div>

          <div className='item'>
            <h4>New mentors</h4>
            <span>{newMentors.length}</span>
          </div>

          <div className='item'>
            <h5>Total users</h5>
            <span>{newMentors.length+newMentees.length}</span>
          </div>

        </div>
    </div>
  )
}

