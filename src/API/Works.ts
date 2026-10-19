import { API_REST } from "./Api";
import type { Work } from "../types/types";

export async function addWork(formData: FormData, token: string): Promise<Work> {
    const res = await fetch(`${API_REST}/works`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
    })
    return res.json()
}

export async function deleteWork(id: number, token: string | null) {
    const res = await fetch(`${API_REST}/works/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
    })
    return res.status
}
