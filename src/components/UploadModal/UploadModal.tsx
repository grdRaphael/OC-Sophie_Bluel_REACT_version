import returnBtn from "../../assets/icons/arrow-left-solid-full.svg"
import crossMark from "../../assets/icons/xmark-solid-full.svg"
import previewImg from "../../assets/icons/image-regular-full.svg"
import './UploadModal.scss'
import type { Category, Work } from "../../types/types"
import { useState } from "react"
import { addWork } from "../../API/Works"
import { useAuth } from "../../context/AuthContext"


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

    const { token } = useAuth()

    const handleSubmit = async () => {
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
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
            <form className="upload-modal__form">
                <label htmlFor="title" className="upload-modal__label">Titre</label>
                <input
                    type="text"
                    id="title"
                    className="upload-modal__input"
                    onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="category" className="upload-modal__label">Catégorie</label>
                <select id="category"
                    className="upload-modal__input"
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option value=""></option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <div className="upload-modal__separator"></div>

                <button className="upload-modal__submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >Valider</button>
            </form>
        </section>
    )
}

export default UploadModal
