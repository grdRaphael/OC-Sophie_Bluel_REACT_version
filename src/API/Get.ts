import { API_REST } from "./Api";

export async function getCategories() {
    const res = await fetch(`${API_REST}/categories`)
    const data = res.json()
    return data
}

export async function getWorks() {
    const res = await fetch (`${API_REST}/works`)
    const data = res.json()
    return data
}

