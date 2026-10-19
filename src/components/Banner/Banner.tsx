import { NavLink } from "react-router-dom"
import './Banner.scss'
import { useAuth } from "../../context/AuthContext"
import editIcon from "../../assets/icons/pen-to-square-regular-full (1).svg"

const Banner = () => {

    const { isLoggedIn, logout } = useAuth()

    return (
        <>
            {isLoggedIn &&
                <div className="edit-banner">
                    <img src={editIcon} alt="" className="edit-banner__icon" />
                    <span className="edit-banner__label">Mode édition</span>
                </div>}
            <header className={`banner ${isLoggedIn ? "banner--edit-mode" : ""}`}>
                <div className="banner__logo">
                    <h1 className="banner__title">Sophie Bluel</h1>
                    <span className="banner__subtitle">Architecte d'intérieur</span>
                </div>
                <nav className="banner__nav">
                    <NavLink className="banner__link" to="/">projets</NavLink>
                    <NavLink className="banner__link" to="/contact">contact</NavLink>
                    {isLoggedIn
                        ? <button className="banner__link" onClick={logout}>logout</button>
                        : <NavLink className="banner__link" to="/login">login</NavLink>}
                </nav>
            </header>
        </>
    )
}

export default Banner
