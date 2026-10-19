import { useState } from "react"
import "./Contact.scss"

type ContactProps = {
    // Permet à Home de faire défiler la page jusqu'à cette section
    ref?: React.Ref<HTMLElement>
}

const Contact = ({ ref }: ContactProps) => {
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.currentTarget.reset()
        setIsSent(true)
    }

    return (
        <section className="contact" id="contact" ref={ref}>
            <h2 className="contact__title">Contact</h2>
            <p className="contact__text">Vous avez un projet ? Discutons-en !</p>

            <form className="contact__form" onSubmit={handleSubmit}>
                <label className="contact__label" htmlFor="name">Nom</label>
                <input className="contact__input" type="text" name="name" id="name" required />

                <label className="contact__label" htmlFor="contact-email">Email</label>
                <input className="contact__input" type="email" name="email" id="contact-email" required />

                <label className="contact__label" htmlFor="message">Message</label>
                <textarea className="contact__textarea" name="message" id="message" rows={10} required />

                <button className="contact__submit" type="submit">Envoyer</button>

                {isSent &&
                    <p className="contact__confirmation">
                        Merci ! (Formulaire de démonstration : aucun message n'est réellement envoyé.)
                    </p>}
            </form>
        </section>
    )
}

export default Contact
