
import { createContext, useState } from "react";



export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
    const [search, setSearch] = useState([]);
    const [reaload, setReload] = useState(false);
    const [matched, setMatched] = useState(Boolean);

    const isReload = ()=> setReload(!reaload)




return (
<SearchContext.Provider
value={{
    search,
    setSearch,
    isReload,
    reaload, 
    setReload,
    matched,
   setMatched
}}
>
{children}
</SearchContext.Provider>
);
};

export default SearchContextProvider;



