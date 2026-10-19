export type Category = {
    id: number
    name: string
}

export type Work = {
    id: number
    title: string
    imageUrl: string
    categoryId: number
    userId: number
    category: Category
}