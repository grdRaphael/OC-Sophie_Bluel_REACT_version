import returnBtn from "../../assets/icons/arrow-left-solid-full.svg"
import crossMark from "../../assets/icons/xmark-solid-full.svg"
import previewImg from "../../assets/icons/image-regular-full.svg"
import './UploadModal.scss'
import type { Category, Work } from "../../types/types"
import { useState } from "react"
import { addWork } from "../../API/Works"
import { useAuth } from "../../context/AuthContext"


type FormErrors = {
    title?: string
    image?: string
    category?: string
}

type UploadModalProps = {
    categories: Category[]
    setUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setGalleryModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    setWorks: React.Dispatch<React.SetStateAction<Work[]>>
}

const UploadModal = ({ categories, setUploadModalOpen, setIsModalOpen, setGalleryModalOpen, setWorks }: UploadModalProps) => {
    const [title, setTitle] = useState<string>()
    const [categoryId, setCategoryId] = useState<string>()
    const [image, setImage] = useState<File | null>(null)
    const [errors, setErrors] = useState<FormErrors>({})

    const { token } = useAuth()

    // Calculé à chaque rendu à partir des states : pas besoin d'un state en plus
    const isFormValid = !!title && !!image && !!categoryId

    const handleSubmit = async () => {
        const newErrors: FormErrors = {}
        if (!title) newErrors.title = "Veuillez renseigner un titre"
        if (!image) newErrors.image = "Aucune photo sélectionnée"
        if (!categoryId) newErrors.category = "Veuillez sélectionner une catégorie"
        setErrors(newErrors)

        if (!image || !title || !categoryId || !token) return

        const formData = new FormData()
        formData.append("image", image)
        formData.append("title", title)
        formData.append("category", categoryId)

        const newWork = await addWork(formData, token)
        setWorks(prev => [...prev, newWork])
        setUploadModalOpen(false)
        setGalleryModalOpen(true)        
    }




    return (
        <section className="upload-modal">
            <button className="upload-modal__return"
                onClick={() => { setUploadModalOpen(false); setGalleryModalOpen(true) }}>
                <img src={returnBtn} alt="Retour" />
            </button>
            <button className="upload-modal__close" onClick={() => setIsModalOpen(false)}>
                <img src={crossMark} alt="Fermer" />
            </button>

            <h3 className="upload-modal__title">Ajout photo</h3>


            <label htmlFor="upload" >
                <div className="upload-modal__box">
                    {!image ?
                        <>
                            <img src={previewImg} alt="" className="upload-modal__box-icon" />
                            <div className="upload-modal__box-label">+ Ajouter photo</div>
                            <p className="upload-modal__box-info">jpg, png : 4mo max</p>
                        </>
                        : <img src={URL.createObjectURL(image)}
                            alt="Aperçu de la photo"
                            className="upload-modal__box-preview" />}
                </div>
            </label>
            <input
                type="file"
                id="upload"
                className="upload-modal__file"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    setImage(e.target.files?.[0] ?? null)
                    setErrors(prev => ({ ...prev, image: undefined }))
                }}
            />
            <form className="upload-modal__form">
                <label htmlFor="title" className="upload-modal__label">Titre</label>
                <input
                    type="text"
                    id="title"
                    className="upload-modal__input"
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setErrors(prev => ({ ...prev, title: undefined }))
                    }} />

                <label htmlFor="category" className="upload-modal__label">Catégorie</label>
                <select id="category"
                    className="upload-modal__input"
                    onChange={(e) => {
                        setCategoryId(e.target.value)
                        setErrors(prev => ({ ...prev, category: undefined }))
                    }}>
                    <option value=""></option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <div className="upload-modal__separator"></div>

                {/* Gris tant que le formulaire est incomplet, mais toujours cliquable :
                    le clic affiche les messages d'erreur (comme dans la version JS) */}
                <button className={`upload-modal__submit ${isFormValid ? "upload-modal__submit--enabled" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >Valider</button>

                {errors.title && <p className="upload-modal__error">{errors.title}</p>}
                {errors.image && <p className="upload-modal__error">{errors.image}</p>}
                {errors.category && <p className="upload-modal__error">{errors.category}</p>}
            </form>
        </section>
    )
}

export default UploadModal
