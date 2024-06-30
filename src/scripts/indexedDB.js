// indexedDB.js
const dbPromise = idb.openDB('restaurant-catalog', 1, {
    upgrade(db) {
        const store = db.createObjectStore('restaurants', {
            keyPath: 'id'
        });
        store.createIndex('name', 'name', { unique: false });
    }
});

async function toggleFavoriteRestaurant(restaurant) {
    const db = await dbPromise;
    const tx = db.transaction('restaurants', 'readwrite');
    const store = tx.objectStore('restaurants');

    const restaurantExists = await store.get(restaurant.id);

    if (restaurantExists) {
        await store.delete(restaurant.id);
    } else {
        await store.put(restaurant);
    }

    return tx.complete;
}

async function getFavoriteRestaurants() {
    const db = await dbPromise;
    const tx = db.transaction('restaurants', 'readonly');
    const store = tx.objectStore('restaurants');

    return store.getAll();
}

async function removeFavoriteRestaurant(id) {
    const db = await dbPromise;
    const tx = db.transaction('restaurants', 'readwrite');
    const store = tx.objectStore('restaurants');

    await store.delete(id);

    return tx.complete;
}
