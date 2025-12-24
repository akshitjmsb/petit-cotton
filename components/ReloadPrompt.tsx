import React, { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
    // Check if we should skip service worker registration (desktop devices)
    const shouldSkipSW = typeof window !== 'undefined' && 
                        (window as any).__SKIP_SW_REGISTRATION__ === true;
    
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        immediate: !shouldSkipSW, // Only register immediately on mobile
        onRegistered(r) {
            if (!shouldSkipSW) {
                console.log('SW Registered: ' + r)
            }
        },
        onRegisterError(error) {
            if (!shouldSkipSW) {
                console.log('SW registration error', error)
            }
        },
    })
    
    // Unregister service worker on desktop if it was previously registered
    useEffect(() => {
        if (shouldSkipSW && 'serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach(registration => {
                    registration.unregister().then(() => {
                        console.log('Service worker unregistered on desktop')
                    })
                })
            })
        }
    }, [shouldSkipSW])

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    // Don't show reload prompt on desktop
    if (shouldSkipSW || (!offlineReady && !needRefresh)) return null

    return (
        <div className="fixed bottom-5 right-5 z-50 p-4 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col gap-2 max-w-sm animate-fade-in">
            <div className="text-sm text-gray-700">
                {offlineReady
                    ? <span>App ready to work offline</span>
                    : <span>New content available, click on reload button to update.</span>
                }
            </div>
            <div className="flex gap-2 justify-end">
                {needRefresh && (
                    <button
                        className="px-3 py-1 bg-primary text-white rounded text-xs font-semibold hover:bg-primary-dark transition-colors"
                        onClick={() => updateServiceWorker(true)}
                    >
                        Reload
                    </button>
                )}
                <button
                    className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={close}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default ReloadPrompt
