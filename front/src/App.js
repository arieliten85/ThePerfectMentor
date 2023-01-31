
import * as React from "react";
import "./style/app.scss";
import {  Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import Register from "./component/register/Register";
import Home from "./component/home/Home";
import Dashboard from "./component/dashboard/Dashboard";
import Edit from "./component/dashboard/content/cards/cardUsersReports/edit_user/Edit";

import UsersDBContextProvider from "./context/UsersDBContext";
import SearchContextProvider from "./context/SearchContext";
import UserContextProvider from "./context/UserContext";
import DateTime from "./component/dashboard/content/cards/cardUsersReports/dateTime_picker/DateTime";
import Chat from "./component/dashboard/content/cards/cardUsersReports/chat/Chat";

function App() {

  return (
    <>
     <SearchContextProvider>
      <UsersDBContextProvider>
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/user" element={<Dashboard/>} />
            <Route path="/reports" element={<Dashboard/>} />
            <Route path="/profile" element={<Dashboard/>} />
            <Route path="/stadistics" element={<Dashboard/>} />
            <Route path="/user/edit/:id" element={<Edit/>} />
            {/* <Route path="/user/delete/:id" element={<Delete/>} /> */}
            <Route path="/schedule/:user" element={<DateTime/>} />
            <Route path="/chat/:id" element={<Chat/>} />
          </Routes>
        </UserContextProvider>
      </UsersDBContextProvider>
      </SearchContextProvider>
    </>
  );
}

export default App;


