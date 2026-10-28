import sophiePhoto from '../../assets/images/sophie-bluel.png'
import Filters from '../../components/Filters/Filters'
import Gallery from '../../components/Gallery'
import { useAuth } from '../../context/AuthContext'
import "./Home.scss"
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Work, Category } from '../../types/types'
import { getCategories, getWorks } from "../../API/Get"
import editionLogo from "../../assets/icons/pen-to-square-regular-full black.svg"
import GalleryModal from '../../components/GalleryModal/GalleryModal'
import Contact from '../../components/Contact/Contact'
import Toast from '../../components/Toast/Toast'
import { deleteWork } from '../../API/Works'

const Home = () => {

    const { isLoggedIn, token, logout } = useAuth()
    const navigate = useNavigate()

    // Suppression envoyée à l'API. Token refusé (401, expiré) : déconnexion et retour à la connexion
    // (en revenant, la galerie est rechargée : le projet non supprimé réapparaît)
    const confirmDeletion = useCallback(async (id: number) => {
        const status = await deleteWork(id, token)
        if (status === 401) {
            logout()
            navigate("/login", { state: { message: "Session expirée, veuillez vous reconnecter" } })
        }
    }, [token, logout, navigate])

    const [categories, setCategories] = useState<Category[]>([])
    const [works, setWorks] = useState<Work[]>([])
    const [filterId, setFilterId] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Projet supprimé mais encore annulable (5 secondes), ou null
    const [pendingDeletion, setPendingDeletion] = useState<Work | null>(null)


    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories()
            setCategories(data)
        }
        const fetchWorks = async () => {
            const data = await getWorks()
            setWorks(data)
        }

        fetchCategories()
        fetchWorks()
    }, [])

    // Toast "Annuler" : au bout de 5 secondes, la suppression devient définitive.
    // Si pendingDeletion change (annulation ou nouvelle suppression), React appelle
    // d'abord la fonction de nettoyage → clearTimeout, le minuteur précédent est arrêté.
    useEffect(() => {
        if (!pendingDeletion) return

        const timer = setTimeout(() => {
            confirmDeletion(pendingDeletion.id)
            setWorks(prev => prev.filter(work => work.id !== pendingDeletion.id))
            setPendingDeletion(null)
        }, 5000)

        return () => clearTimeout(timer)
    }, [pendingDeletion, confirmDeletion])

    const handleDeleteWork = (work: Work) => {
        // Une seule suppression annulable à la fois : si une autre était en attente,
        // elle est confirmée tout de suite avant de passer à la nouvelle
        if (pendingDeletion) {
            confirmDeletion(pendingDeletion.id)
            setWorks(prev => prev.filter(prevWork => prevWork.id !== pendingDeletion.id))
        }
        setPendingDeletion(work)
    }

    // Le projet en attente de suppression est masqué partout (galerie et modale)
    const visibleWorks = works.filter(work => work.id !== pendingDeletion?.id)

    const filtered = visibleWorks.filter(element =>
        filterId ? element.categoryId === filterId : true)



    return (
        <>
            <section className="hero">
                <img src={sophiePhoto} alt="Sophie Bluel" className="hero__photo" />
                <div className="hero__intro">
                    <h2 className="hero__intro-title">Designer d'espace</h2>
                    <p className="hero__intro-text">
                        Je raconte votre histoire, je valorise vos idées. Je vous accompagne de la conception à la livraison finale du chantier.
                        Chaque projet sera étudié en commun, de façon à mettre en valeur les volumes, les matières et les couleurs dans le respect de l’esprit des lieux, et le choix adapté des matériaux. Le suivi du chantier sera assuré dans le souci du détail, le respect du planning et du budget.
                        En cas de besoin, une équipe pluridisciplinaire peut être constituée : architecte DPLG, décorateur(trice).
                    </p>
                </div>
            </section>

            <section className="portfolio">
                <div className="portfolio__header">
                    <h2 className="portfolio__title">Mes projets</h2>
                    {isLoggedIn &&
                        <button
                            className="portfolio__edit-btn"
                            onClick={() => setIsModalOpen(true)}>
                            <img src={editionLogo} alt="" />
                            Modifier
                        </button>}
                    {isModalOpen &&
                        <GalleryModal
                            works={visibleWorks}
                            setWorks={setWorks}
                            setIsModalOpen={setIsModalOpen}
                            categories = {categories}
                            onDeleteWork={handleDeleteWork} />}
                </div>

                {!isLoggedIn && <Filters
                    filterId={filterId}
                    setFilterId={setFilterId}
                    categories={categories} />}
                <Gallery filtered={isLoggedIn ? visibleWorks : filtered}/>

            </section>

            <Contact />

            {pendingDeletion &&
                <Toast
                    message="Projet supprimé..."
                    onCancel={() => setPendingDeletion(null)} />}
        </>
    )
}

export default Home