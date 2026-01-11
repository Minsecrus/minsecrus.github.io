import { useEffect } from 'react'
import './Toast.css'

export function Toast({ message, type = 'success', duration = 3000, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-message interact">{message}</span>
            <button className="toast-close" onClick={onClose} aria-label="关闭提示">
                ×
            </button>
        </div>
    )
}

export function ToastContainer({ toasts, removeToast }) {
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    )
}
