if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  
    // Add listener for message from service worker
    navigator.serviceWorker.addEventListener('message', event => {
      console.log('Message from service worker:', event.data);
      // Handle specific messages from service worker if needed
    });
  }
  