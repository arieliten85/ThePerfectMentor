import React from 'react'
import GaphBar from './graph_bar/Gaph_bar';
import StadisticsUser from './stadistics_users/Stadistics_user';


export default function CardStadistics() {

  return (
    <div className='stadistics'>
      <StadisticsUser/>
      <GaphBar/>
    </div>
  )
}
