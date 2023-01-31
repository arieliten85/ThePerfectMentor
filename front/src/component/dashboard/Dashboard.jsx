
import React from 'react'
import Nav from './nav/Nav';
import Header from './header/Header';
import Content from './content/Content';
import { useLocation } from 'react-router-dom';
import Pagination from '../dashboard/pagination/Pagination';

export default function Dashboard() {
  const path = useLocation()
  let pathRoute = path.pathname.slice(1);

  return (
    <div className='dashboard'>
        <Header/>
        <Nav/>
        <Content/>
        {pathRoute === "user"  && <Pagination/>}
        {pathRoute === "reports"  && <Pagination/>}
        
    </div>
  )
}
