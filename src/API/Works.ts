import { API_REST } from "./Api";
import type { Work } from "../types/types";

// Erreur renvoyée par l'API, avec son code HTTP (401 = token expiré ou invalide : il faut se reconnecter)
export class ApiError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

export async function addWork(formData: FormData, token: string): Promise<Work> {
    const res = await fetch(`${API_REST}/works`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    })

    if (!res.ok) {
        if (res.status === 401) throw new ApiError(401, "Session expirée, veuillez vous reconnecter")
        // L'API envoie parfois un message lisible (format refusé, image trop grande, limite atteinte...)
        const data = await res.json().catch(() => null)
        const message = typeof data?.error === "string" ? data.error : "L'ajout du projet a échoué"
        throw new ApiError(res.status, message)
    }
    return res.json()
}

export async function deleteWork(id: number, token: string | null) {
    const res = await fetch(`${API_REST}/works/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
    })
    return res.status
}
