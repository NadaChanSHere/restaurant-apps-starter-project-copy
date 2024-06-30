importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.3.0/workbox-sw.js');

workbox.routing.registerRoute(
    ({url}) => url.origin === 'https://restaurant-api.dicoding.dev',
    new workbox.strategies.NetworkFirst()
);