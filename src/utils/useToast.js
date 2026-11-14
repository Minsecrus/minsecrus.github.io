import { useState, useCallback } from 'react'

export function useToast() {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'success', duration = 3000, anchor = null) => {
        const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
        setToasts((prev) => [...prev, { id, message, type, duration, anchor }])
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    const copyWithToast = useCallback(async (text, label, event) => {
        let anchor = null
        if (event?.currentTarget?.getBoundingClientRect) {
            const rect = event.currentTarget.getBoundingClientRect()
            anchor = {
                x: rect.left + rect.width / 2,
                y: rect.top,
                bottom: rect.bottom,
            }
        }

        try {
            await navigator.clipboard.writeText(text)
            addToast(`已复制 ${label}`, 'success', 3000, anchor)
        } catch {
            addToast('复制失败，请重试', 'error', 3000, anchor)
        }
    }, [addToast])

    return {
        toasts,
        addToast,
        removeToast,
        copyWithToast,
    }
}
