import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Login.scss"
import { authenticate } from "../../API/Authenticate"
import { useAuth } from "../../context/AuthContext"

const LoginPage = () => {
    const [email, setEmail] = useState("sophie.bluel@test.tld")
    const [password, setPassword] = useState("S0phie")
    // Message transmis par la page précédente (ex. "Session expirée" après un refus de l'API)
    const location = useLocation()
    const [error, setError] = useState<string>(location.state?.message ?? "")
    const navigate = useNavigate()
    const {login} = useAuth()


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        try {
            const data = await authenticate(email, password)
            login(data.token)
            navigate("/")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Une erreur est survenue")
        }
    }

    return (
        <section className="login">
            <h2 className="login__title">Log in</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <div className="login__field">
                    <label className="login__label" htmlFor="email">Email</label>
                    <input
                        className="login__input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="login__field">
                    <label className="login__label" htmlFor="password">Mot de passe</label>
                    <input
                        className="login__input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="login__error">{error}</p>}

                <button className="login__submit" type="submit">Se connecter</button>
                <a className="login__forgot" href="#">Mot de passe oublié</a>
            </form>
        </section>
    )
}

export default LoginPage
