import { createContext } from "react";

const UserState = createContext({
    user: { },
    logout:()=>{},
    setUser:()=>{},
})

export default function({children}){

    return <>
        <UserState.Provider value={{
            user
        }}>
            {children}

        </UserState.Provider>
    </>
}