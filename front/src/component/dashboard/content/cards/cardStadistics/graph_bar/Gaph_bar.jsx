import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import AllUsers from '../../../../../../utils/querys/AllUsers';
export default function Gaph_bar() {

const [userStadistics, setUserStadistics] = useState([]);
const [infoDataBar, setInfoDataBar] = useState([]);

const dataArr = [

    {name_month:"Enero", month:"01",total:0},
    {name_month:"Febrero", month:"02",total:0},
    {name_month:"Marzo", month:"03",total:0},
    {name_month:"Abril", month:"04",total:0},
    {name_month:"Mayo", month:"05",total:0},
    {name_month:"Junio", month:"06",total:0},
    {name_month:"Julio", month:"07",total:0},
    {name_month:"Agosto", month:"08",total:0},
    {name_month:"Septiembre", month:"09",total:0},
    {name_month:"Octubre", month:"10",total:0},
    {name_month:"Noviembre", month:"11",total:0},
    {name_month:"Diciembre", month:"12",total:0},
    
]


useEffect(()=>{
AllUsers()
.then((res)=>  setUserStadistics(res.data))
},[])

// DB STADISTICS
useEffect(()=>{

   
   

for (let i = 0; i < userStadistics.length; i++) {
    const userDate = userStadistics[i].date.substring(5,7);
    for (let j = 0; j < dataArr.length; j++) {
        const data = dataArr[j];
        if(data.month === userDate){
        data.total += 1
        }
    }
    setInfoDataBar(dataArr)
 }
},[userStadistics])



  return (
    <div style={{ background: "#F5F6F7",  padding:" 15px", borderRadius: "20px"}} >
            <ResponsiveContainer width="100%" aspect={2}>
        <BarChart 
            data={infoDataBar}
            width={500}
            height={300}
            margin={{
            top:-30,
            right:-50,
            left:-40,
            bottom:-10
            }}
        >
            <CartesianGrid strokeDasharray="4 1 2" />    
            <XAxis dataKey="name_month"/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#BFD732"/>
            </BarChart>
        </ResponsiveContainer>  
 </div>
  )
}
