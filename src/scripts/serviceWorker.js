// serviceWorker.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered! Scope:', registration.scope);
            })
            .catch(err => {
                console.error('Service Worker registration failed:', err);
            });
    });
}
