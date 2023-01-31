import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../../../../../context/UserContext';
import Header from '../../../../header/Header';
import { IoLogoGooglePlaystore } from 'react-icons/io5';

//SOCKET IO
import io  from "socket.io-client"
import { useRef } from 'react';
import axios from 'axios';

export default function Chat() {

  const socket = useRef()
  const {user } = useContext(UserContext);
  const {id,name} = useParams()

  const [arrivalMenssage,setArrivalMessage]=useState(null)
  const [messages,setMessages]=useState([])
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Se conecta
    socket.current=io("http://localhost:3030")
  // Trae los mensajes
    socket.current.on("getMessage",(data)=>{
      setArrivalMessage({
        sender:data.senderId,
        senderName:data.senderName,
        text:data.text,
        createdAt: Date.now()
      })
    })
  },[])

// Pregunta si hay mensajes nuevos, pushealos al Array
  useEffect(() => {
     arrivalMenssage &&  setMessages(prev => [...prev, arrivalMenssage]);
  },[arrivalMenssage])

  useEffect(() => {
      socket.current.emit("addUser",user.id)
      socket.current.on("getUsers",users =>{ 
      console.log(users)
    })
  },[user])
  
    
   
useEffect(() => {
  const getMessages = async () => {
    try {
       await axios.get("http://localhost:3030/api/message/all/" + id);
    } catch (err) {
      console.log(err);
    }
  };
  getMessages();
}, []);


  
  
   

const handleSend = async (e) => {
    e.preventDefault()

    const menssageText = {
      chat_id:id,
      sender_id:user.id,
      senderName:"Me",
      text:newMessage,
      createdAt: Date.now()
    }

  
    socket.current.emit("sendMessage",{
      senderId:user.id,
      receiverId: id,
      text:newMessage,
      senderName:user.name,
      receiverName: name, //daniela
    })

    // try {
    //   const res = await axios.post("http://localhost:3030/api/message/add", menssageText);
    //   setMessages([...messages, res.data]);
    //   text.value = ""
    // } catch (err) {
    //   console.log(err);
    // }
    
    setMessages(prev => [...prev, menssageText])
  
    setNewMessage("")
  
    
}

  return (
   <>
     <Header/>
     <form className='formChat' >

         {/* <div className='titleName'>
            <h2>Daniela</h2>
          </div> */}

        <div className='chatBox '>
            {messages.map((item, i) => {
              return (
                <div className={item.senderName.includes("Me") ? "itemMessage  ContainerMe" : "itemMessage2 ContainerReceived"} key={i}>
                  <div className={item.senderName.includes("Me") ? "me" : "received"} >
                    <h6>{item.senderName}</h6>
                     <p>{item.text}</p>
                  </div>          
              </div>
               );
            })}
        </div>
           
       <div className='containerText '>
          <textarea
          className="chatMessageInput"
          placeholder="write something..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
          />
          <div className='buttonInto' onClick={handleSend}> <IoLogoGooglePlaystore/></div>
       </div>
    </form>
   </>
  )
}
