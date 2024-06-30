// Function to initialize IndexedDB
const dbPromise = idb.openDB('restaurant-catalog', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('restaurants')) {
        db.createObjectStore('restaurants', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('favorites')) {
        db.createObjectStore('favorites', { keyPath: 'id' });
      }
    }
  });
  
  // Function to store restaurant data
  async function storeRestaurants(restaurants) {
    const db = await dbPromise;
    const tx = db.transaction('restaurants', 'readwrite');
    const store = tx.objectStore('restaurants');
    await Promise.all(restaurants.map(async restaurant => {
      await store.put(restaurant);
    }));
    await tx.done;
  }
  
  // Function to get all restaurants
  async function getAllRestaurants() {
    const db = await dbPromise;
    const tx = db.transaction('restaurants', 'readonly');
    const store = tx.objectStore('restaurants');
    return store.getAll();
  }
  
  // Function to add restaurant to favorites
  async function addToFavorites(restaurant) {
    const db = await dbPromise;
    const tx = db.transaction('favorites', 'readwrite');
    const store = tx.objectStore('favorites');
    await store.put(restaurant);
    await tx.done;
  }
  
  // Function to remove restaurant from favorites
  async function removeFromFavorites(restaurantId) {
    const db = await dbPromise;
    const tx = db.transaction('favorites', 'readwrite');
    const store = tx.objectStore('favorites');
    await store.delete(restaurantId);
    await tx.done;
  }
  
  // Function to check if a restaurant is favorite
  async function isFavorite(restaurantId) {
    const db = await dbPromise;
    const tx = db.transaction('favorites', 'readonly');
    const store = tx.objectStore('favorites');
    return !!await store.get(restaurantId);
  }
  
  export {
    storeRestaurants,
    getAllRestaurants,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
  