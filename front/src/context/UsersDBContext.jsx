
import { createContext, useState } from "react";

export const UsersDBContext = createContext();

const  UsersDBContextProvider = ({ children }) => {

const [page, setPage] = useState(0);

return (
<UsersDBContext.Provider
value={{
    page,
    setPage,
}}
>
{children}
</UsersDBContext.Provider>
);
};

export default UsersDBContextProvider;



