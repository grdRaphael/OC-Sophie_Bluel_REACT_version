/// <reference types="vite/client" />

// Variables d'environnement du projet (préfixe VITE_ obligatoire pour être lisibles dans le front)
interface ImportMetaEnv {
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
