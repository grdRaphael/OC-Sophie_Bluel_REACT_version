import crossMark from "../../assets/icons/xmark-solid-full.svg"
import type { Work, Category } from "../../types/types"
import './GalleryModal.scss'
import trashcan from "../../assets/icons/trash-can-solid-full.svg"
import UploadModal from "../UploadModal/UploadModal"
import { useState } from "react"
import { deleteWork } from "../../API/Works"
import { useAuth } from "../../context/AuthContext"

type GalleryModalProps = {
    works: Work[]
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    categories: Category[]
    setWorks: React.Dispatch<React.SetStateAction<Work[]>>
}

const GalleryModal = ({ works, setIsModalOpen, categories, setWorks }: GalleryModalProps) => {
    const [isGalleryModalOpen, setGalleryModalOpen] = useState(true)
    const [isUploadModalOpen, setUploadModalOpen] = useState(false)

    const {token} = useAuth()


    return (
        <div className="background__modals"
        onClick={(e)=> {
            // On ferme seulement si le clic est sur le fond lui-même, pas sur un enfant
            if(e.target === e.currentTarget){
                setIsModalOpen(false)
            }
        }}>
            {isGalleryModalOpen &&
                <section className="gallery__modal">
                    <button className="xmark__btn"
                        onClick={() => setIsModalOpen(false)}>
                        <img src={crossMark} alt="Fermer" />
                    </button>
                    <h3>Galerie photo</h3>
                    <div className="gallery_modal">
                        {works.map(work => (
                            <figure className="gallery_modal__caption" key={work.id} data-id={work.id}>
                                <img src={work.imageUrl} alt={work.title} className="gallery_modal__img" />
                                <button className="delete_work__btn"
                                onClick={()=> {
                                    deleteWork(work.id, token);
                                    setWorks(prev => prev.filter(prevWork => prevWork.id !== work.id))
                                }}
                                >
                                    <img src={trashcan} alt="Supprimer" />
                                </button>
                            </figure>
                        ))}
                    </div>
                    <button className="add_photo__button"
                        onClick={() => { setGalleryModalOpen(false); setUploadModalOpen(true)}}
                    >Ajouter une photo</button>
                </section>
            }

            {isUploadModalOpen &&
            <UploadModal
            categories={categories}
            setUploadModalOpen={setUploadModalOpen}
            setIsModalOpen={setIsModalOpen}
            setGalleryModalOpen={setGalleryModalOpen}
            setWorks={setWorks}/>}

        </div>
    )
}

export default GalleryModal