import { API_REST } from "./Api";
import type { Category, Work } from "../types/types";

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${API_REST}/categories`)
    const data = await res.json()
    return data
}

export async function getWorks(): Promise<Work[]> {
    const res = await fetch(`${API_REST}/works`)
    const data = await res.json()
    return data
}
