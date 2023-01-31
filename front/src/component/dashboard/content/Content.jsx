import React from 'react'
import { useLocation } from 'react-router-dom';
import ContenCard from './card_container/Card_container';

export default function Content() {
  const path = useLocation()
  let pathRoute = path.pathname.slice(1)

  return (
    <div className= {pathRoute !== "profile" ? 'formContent2' :'formContent2 boxProfile'   }>
        <ContenCard/>
    </div>
  )
}
