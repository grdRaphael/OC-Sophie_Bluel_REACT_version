import "./Contact.scss"

const Contact = () => {
    return (
        <section className="contact" id="contact">
            <h2 className="contact__title">Contact</h2>
            <p className="contact__text">Vous avez un projet ? Discutons-en !</p>

            <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
                <label className="contact__label" htmlFor="name">Nom</label>
                <input className="contact__input" type="text" name="name" id="name" />

                <label className="contact__label" htmlFor="contact-email">Email</label>
                <input className="contact__input" type="email" name="email" id="contact-email" />

                <label className="contact__label" htmlFor="message">Message</label>
                <textarea className="contact__textarea" name="message" id="message" rows={10} />

                <button className="contact__submit" type="submit">Envoyer</button>
            </form>
        </section>
    )
}

export default Contact
