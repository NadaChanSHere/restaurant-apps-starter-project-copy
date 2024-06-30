// Global variable to store IndexedDB instance
let db;

// Function to initialize IndexedDB
function initDB() {
  return idb.open('restaurant-catalog-db', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('favorites')) {
      const store = upgradeDb.createObjectStore('favorites', { keyPath: 'id' });
      store.createIndex('id', 'id', { unique: true });
    }
  });
}

// Function to toggle favorite status
async function toggleFavorite(restaurant) {
  if (!db) {
    console.error('IndexedDB not initialized.');
    return;
  }

  const tx = db.transaction('favorites', 'readwrite');
  const store = tx.objectStore('favorites');

  const exists = await store.get(restaurant.id);
  if (exists) {
    await store.delete(restaurant.id);
    console.log('Removed from favorites:', restaurant);
  } else {
    await store.put(restaurant);
    console.log('Added to favorites:', restaurant);
  }

  await tx.complete;
}

// Function to check if a restaurant is favorite
async function isFavorite(restaurantId) {
  if (!db) {
    console.error('IndexedDB not initialized.');
    return false;
  }

  const tx = db.transaction('favorites');
  const store = tx.objectStore('favorites');

  const exists = await store.get(restaurantId);
  await tx.complete;

  return !!exists;
}

// Function to fetch and display restaurants
async function fetchAndDisplayRestaurants() {
  try {
    const response = await fetch('https://restaurant-api.dicoding.dev/list');
    const data = await response.json();

    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = ''; // Clear previous list

    data.restaurants.forEach(restaurant => {
      const restaurantItem = document.createElement('div');
      restaurantItem.classList.add('restaurant');
      restaurantItem.innerHTML = `
        <img src="${restaurant.pictureId}" alt="${restaurant.name}">
        <a href="#">${restaurant.name}</a>
        <p>City: ${restaurant.city}</p>
        <p>Rating: ${restaurant.rating}</p>
        <button class="favorite-button" data-id="${restaurant.id}" aria-label="Add to Favorites">&#9825;</button>
      `;
      
      const favoriteButton = restaurantItem.querySelector('.favorite-button');
      isFavorite(restaurant.id).then(isFav => {
        if (isFav) {
          favoriteButton.classList.add('favorited');
        } else {
          favoriteButton.classList.remove('favorited');
        }
      });

      favoriteButton.addEventListener('click', async () => {
        await toggleFavorite(restaurant);
        favoriteButton.classList.toggle('favorited');
      });

      restaurantList.appendChild(restaurantItem);
    });
  } catch (error) {
    console.error('Error fetching or displaying restaurant data:', error);
  }
}

// Initialize IndexedDB on page load
window.addEventListener('load', async () => {
  db = await initDB();
  fetchAndDisplayRestaurants();
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
