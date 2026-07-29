import { API_REST } from "./Api"

type LoginResponse = {
    token: string
    userId: number
}

export async function authenticate(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_REST}/users/login`, {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    if (!res.ok) {
        if (res.status === 404) throw new Error("Utilisateur introuvable")
        if (res.status === 401) throw new Error("Mot de passe incorrect")
            throw new Error("Erreur serveur")
    }
    const data: LoginResponse = await res.json()
    return data
}