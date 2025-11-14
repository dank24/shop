import React, { Children, ReactElement } from "react";
import { createContext } from "react";

interface contextTy {
    test?: string
}

export const MainContextEx = createContext<contextTy>({});

function MainContext({children}) {
 /* variables */
    const test: string = 'this is a test'

 /* functions */


 /* return */
    return(
        <MainContextEx.Provider value={{test}}>
            {
                children
            }
        </MainContextEx.Provider>
    )
}

export default MainContext;