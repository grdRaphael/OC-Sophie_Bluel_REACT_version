import "./Toast.scss"

type ToastProps = {
    message: string
    onCancel: () => void
}

const Toast = ({ message, onCancel }: ToastProps) => {
    return (
        <div className="toast">
            {message}
            <button className="toast__cancel" onClick={onCancel}>Annuler</button>
        </div>
    )
}

export default Toast
