import { createContext, useContext, useState } from "react"

type AuthContextType = {
    token: string | null
    isLoggedIn: boolean
    login : (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider ({children}: {children: React.ReactNode}){
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"))

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    const isLoggedIn = token !== null

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined){
        throw new Error("useAuth doit être utilisé dans un AuthProvider")
    }
    return context
}

