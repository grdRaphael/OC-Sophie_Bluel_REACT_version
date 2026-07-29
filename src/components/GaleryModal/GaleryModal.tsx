import crossMark from "../../assets/icons/xmark-solid-full.svg"
import type { Work, Category } from "../../types/types"
import './GaleryModal.scss'
import trashcan from "../../assets/icons/trash-can-solid-full.svg"
import UploadModal from "../UploadModal/UploadModal"
import { useState } from "react"
import { API_REST } from "../../API/Api"
import { useAuth } from "../../context/AuthContext"


async function deleteWork(id: number, token: string | null){
    const res = await fetch(`${API_REST}/works/${id}`,{
        method:'DELETE',
        headers: {"Authorization" : `Bearer ${token}`}
    })
    return res.status
}

type GalleryModalProps = {
    works: Work[]
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    categories: Category[]
    setWorks: React.Dispatch<React.SetStateAction<Work[]>>
}

const Modal = ({ works, setIsModalOpen, categories, setWorks }: GalleryModalProps) => {
    const [GalleryModalOpen, setGalleryModalOpen] = useState(true)
    const [UploadModalOpen, setUploadModalOpen] = useState(false)
    const [newWork, setNewWork] = useState()

    const {token} = useAuth()


    return (
        <div className="background__modals" 
        onClick={(e)=> {
            if(e.target === document.querySelector(".background__modals")){
                setIsModalOpen(false)
            }
        }}>
            {GalleryModalOpen &&
                <section className="gallery__modal">
                    <button className="xmark__btn"
                        onClick={() => setIsModalOpen(false)}>
                        <img src={crossMark} alt="" />
                    </button>
                    <h3>Gallerie photo</h3>
                    <div className="underline"></div>
                    <div className="gallery_modal">
                        {works.map(work => (
                            <figure className="gallery_modal__caption" key={work.id} data-id={work.id}>
                                <img src={work.imageUrl} alt="" className="gallery_modal__img" />
                                <button className="delete_work__btn"
                                onClick={()=> {
                                    deleteWork(work.id, token);
                                    setWorks(prev => prev.filter(prevWork => prevWork.id !== work.id))
                                }}
                                >
                                    <img src={trashcan} alt="" />
                                </button>
                            </figure>
                        ))}
                    </div>
                    <button className="add_photo__button"
                        onClick={() => { setGalleryModalOpen(false); setUploadModalOpen(true)}}
                    >Ajouter une photo</button>
                </section>
            }

            {UploadModalOpen && 
            <UploadModal 
            categories={categories} 
            setUploadModalOpen={setUploadModalOpen}
            setIsModalOpen={setIsModalOpen}
            setGalleryModalOpen={setGalleryModalOpen}
            newWork={newWork}
            setNewWork={setNewWork}
            setWorks={setWorks}/>}
            
        </div>
    )
}

export default Modal