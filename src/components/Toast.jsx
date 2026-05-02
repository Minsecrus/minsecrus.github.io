import { useEffect } from 'react'
import './Toast.css'

export function Toast({ message, type = 'success', duration = 3000, anchor, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const anchorStyle = anchor ? getAnchorStyle(anchor) : undefined

    return (
        <div
            className={`toast toast-${type}${anchor ? ' toast-anchored' : ''}`}
            style={anchorStyle}
            role={type === 'error' ? 'alert' : 'status'}
            aria-live={type === 'error' ? 'assertive' : 'polite'}
        >
            <span className="toast-message interact">{message}</span>
            <button type="button" className="toast-close" onClick={onClose} aria-label="关闭提示">
                ×
            </button>
        </div>
    )
}

function getAnchorStyle(anchor) {
    const viewportPadding = 16
    const offset = 12
    const x = Math.min(Math.max(anchor.x, viewportPadding), window.innerWidth - viewportPadding)
    const placeAbove = anchor.y > 72

    return {
        left: `${x}px`,
        top: `${placeAbove ? anchor.y - offset : anchor.bottom + offset}px`,
        '--toast-offset-y': placeAbove ? '-100%' : '0',
    }
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
                    anchor={toast.anchor}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    )
}
