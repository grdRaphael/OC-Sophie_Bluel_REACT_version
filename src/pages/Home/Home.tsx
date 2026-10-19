import sophiePhoto from '../../assets/images/sophie-bluel.png'
import Filters from '../../components/Filters/Filters'
import Gallery from '../../components/Gallery'
import { useAuth } from '../../context/AuthContext'
import "./Home.scss"
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import type { Work, Category } from '../../types/types'
import { getCategories, getWorks } from "../../API/Get"
import editionLogo from "../../assets/icons/pen-to-square-regular-full black.svg"
import GalleryModal from '../../components/GalleryModal/GalleryModal'
import Contact from '../../components/Contact/Contact'

const Home = () => {

    const { isLoggedIn } = useAuth()
    const location = useLocation()
    const contactRef = useRef<HTMLElement>(null)

    const [categories, setCategories] = useState<Category[]>([])
    const [works, setWorks] = useState<Work[]>([])
    const [isLoadingWorks, setIsLoadingWorks] = useState(true)
    const [filterId, setFilterId] = useState<number | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getCategories()
            setCategories(data)
        }
        const fetchWorks = async () => {
            const data = await getWorks()
            setWorks(data)
            setIsLoadingWorks(false)
        }

        fetchCategories()
        fetchWorks()
    }, [])

    // React Router ne gère pas les ancres (#contact) : on fait défiler nous-mêmes.
    // - location.key change à chaque clic, même si l'URL est identique.
    // - On attend que la galerie soit chargée, sinon elle pousse la section contact
    //   vers le bas pendant le défilement.
    useEffect(() => {
        if (isLoadingWorks) return

        if (location.hash === "#contact") {
            contactRef.current?.scrollIntoView({ behavior: "smooth" })
        } else {
            window.scrollTo({ top: 0 })
        }
    }, [location.key, location.hash, isLoadingWorks])


    const filtered = works.filter(element =>
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
                            works={works}
                            setWorks={setWorks}
                            setIsModalOpen={setIsModalOpen}
                            categories = {categories} />}
                </div>

                {!isLoggedIn && <Filters
                    filterId={filterId}
                    setFilterId={setFilterId}
                    categories={categories} />}
                <Gallery filtered={isLoggedIn ? works : filtered}/>

            </section>

            <Contact ref={contactRef} />
        </>
    )
}

export default Home