import crossMark from "../../assets/icons/xmark-solid-full.svg"
import type { Work, Category } from "../../types/types"
import './GalleryModal.scss'
import trashcan from "../../assets/icons/trash-can-solid-full.svg"
import UploadModal from "../UploadModal/UploadModal"
import { useState } from "react"
import { isMobile } from "../../utils/isMobile"

type GalleryModalProps = {
    works: Work[]
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    categories: Category[]
    setWorks: React.Dispatch<React.SetStateAction<Work[]>>
    onDeleteWork: (work: Work) => void
}

const GalleryModal = ({ works, setIsModalOpen, categories, setWorks, onDeleteWork }: GalleryModalProps) => {
    const [isGalleryModalOpen, setGalleryModalOpen] = useState(true)
    const [isUploadModalOpen, setUploadModalOpen] = useState(false)

    // Animations de sortie en deux temps : 1) un state ajoute la classe qui lance
    // l'animation, l'élément reste affiché ; 2) à la fin (onAnimationEnd), on le retire.
    const [isClosing, setIsClosing] = useState(false)
    const [isGalleryLeaving, setIsGalleryLeaving] = useState(false)

    const closeModal = () => setIsClosing(true)

    const goToUploadModal = () => {
        if (isMobile()) {
            // L'échange de modale se fera à la fin du glissement (slideOut)
            setIsGalleryLeaving(true)
        } else {
            setGalleryModalOpen(false)
            setUploadModalOpen(true)
        }
    }

    return (
        <div className={`background__modals ${isClosing ? "background__modals--closing" : ""}`}
        onClick={(e)=> {
            // On ferme seulement si le clic est sur le fond lui-même, pas sur un enfant
            if(e.target === e.currentTarget){
                closeModal()
            }
        }}
        onAnimationEnd={(e) => {
            // animationend remonte depuis les enfants (vignettes, modales) :
            // on ne réagit qu'à l'animation du fond lui-même
            if (e.target === e.currentTarget && isClosing) {
                setIsModalOpen(false)
            }
        }}>
            {isGalleryModalOpen &&
                <section className={`gallery__modal ${isGalleryLeaving ? "gallery__modal--leaving" : ""}`}
                    onAnimationEnd={(e) => {
                        if (e.target === e.currentTarget && isGalleryLeaving) {
                            setIsGalleryLeaving(false)
                            setGalleryModalOpen(false)
                            setUploadModalOpen(true)
                        }
                    }}>
                    <button className="xmark__btn"
                        onClick={closeModal}>
                        <img src={crossMark} alt="Fermer" />
                    </button>
                    <h3>Galerie photo</h3>
                    <div className="gallery_modal">
                        {works.map(work => (
                            <figure className="gallery_modal__caption" key={work.id} data-id={work.id}>
                                <img src={work.imageUrl} alt={work.title} className="gallery_modal__img" />
                                <button className="delete_work__btn"
                                onClick={() => onDeleteWork(work)}
                                >
                                    <img src={trashcan} alt="Supprimer" />
                                </button>
                            </figure>
                        ))}
                    </div>
                    <button className="add_photo__button"
                        onClick={goToUploadModal}
                    >Ajouter une photo</button>
                </section>
            }

            {isUploadModalOpen &&
            <UploadModal
            categories={categories}
            setUploadModalOpen={setUploadModalOpen}
            onClose={closeModal}
            setGalleryModalOpen={setGalleryModalOpen}
            setWorks={setWorks}/>}

        </div>
    )
}

export default GalleryModal