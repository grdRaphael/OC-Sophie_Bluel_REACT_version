import { createContext, useCallback, useContext, useState } from "react"

type AuthContextType = {
    token: string | null
    isLoggedIn: boolean
    login : (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Le token (JWT) contient sa date d'expiration "exp", en secondes, dans sa 2e partie (encodée en base64url).
// Illisible ou sans date : considéré comme expiré
const isTokenExpired = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")))
        return typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()
    } catch {
        return true
    }
}

// Token gardé d'une visite précédente : effacé s'il a expiré (24 h côté API),
// sinon le site s'afficherait en mode connecté alors que l'API refuserait chaque ajout (401)
const getStoredToken = () => {
    const stored = localStorage.getItem("token")
    if (stored && isTokenExpired(stored)) {
        localStorage.removeItem("token")
        return null
    }
    return stored
}

export function AuthProvider ({children}: {children: React.ReactNode}){
    const [token, setToken] = useState<string | null>(getStoredToken)

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
    }

    // useCallback : même fonction à chaque rendu, utilisable dans les dépendances d'un useEffect
    const logout = useCallback(() => {
        localStorage.removeItem("token")
        setToken(null)
    }, [])

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

