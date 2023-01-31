
import axios from "axios";
import { createContext, useState } from "react";

//Estado del User por defecto
const initialState = {
user: null,
isAuthToken: false,
checkToken: () => null,
toggleAuth: () => null,
};

export const UserContext = createContext(initialState);

const UserContextProvider = ({ children }) => {

// Guarda al User en el LocalStorage y Valida su Autenticacion
const [isLoggedIn, setIsLoggedIn] = useState({
user: JSON.parse(localStorage.getItem("user")),
isAuthToken: localStorage.getItem("authToken") === "true",
});





// Recibe el User Logeado
const toggleAuth = (user) => {

setIsLoggedIn({
user: user,
isAuthToken: !isLoggedIn.isAuthToken,
});

localStorage.setItem("user", JSON.stringify(user));
localStorage.setItem("authToken", !isLoggedIn.isAuthToken);
};

const checkToken = (token) => {

axios.get("http://localhost:3030/api/user/auth", { headers: { "auth-token": token }})
.then(res =>{
toggleAuth(res.data.data.user)
})
.catch((error)=> console.log(error))
};






return (
<UserContext.Provider
value={{
...isLoggedIn,
setIsLoggedIn,
checkToken,
toggleAuth



}}
>
{children}
</UserContext.Provider>
);
};

export default UserContextProvider;



