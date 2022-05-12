import { createContext, useContext, useEffect, useState } from "react";

const commonContexts = createContext();

export function CommonContextProvider({children}) {

    const [currentDateAndTime, setCurrentDateAndTime] = useState();

    // Current Date
    function currentDateAndTimeFunc() {
        
        const time = new Date().toLocaleString("en-us", {
            hour: "2-digit", 
            minute: "2-digit"
        }).split(' ').join('').toLocaleLowerCase();

        const date = new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        
        return `${dd}/${mm}/${yyyy}, ${time}`
    };
    useEffect(() => {
        setCurrentDateAndTime(currentDateAndTimeFunc)
    }, [])

    return <commonContexts.Provider value={
        currentDateAndTime
    }>{children}</commonContexts.Provider>
}
export function useCommonContext(){
    return useContext(commonContexts)
}