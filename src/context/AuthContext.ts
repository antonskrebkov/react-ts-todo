import React, {createContext} from "react";

export type AuthContextType = {
  isAuth: boolean,
  setIsAuth: (isAuth: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: (isAuth) => {}
})