// favorites.js
document.addEventListener('DOMContentLoaded', () => {
    displayFavoriteRestaurants();
});

function displayFavoriteRestaurants() {
    getFavoriteRestaurants()
        .then(favoriteRestaurants => {
            const favoriteList = document.getElementById('favorite-restaurants');
            favoriteList.innerHTML = '';

            favoriteRestaurants.forEach(restaurant => {
                const favoriteItem = document.createElement('div');
                favoriteItem.classList.add('favorite-item');

                favoriteItem.innerHTML = `
                    <img src="${restaurant.picture}" alt="${restaurant.name}">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.city}</p>
                    <button class="cta" data-id="${restaurant.id}" data-name="${restaurant.name}" data-picture="${restaurant.picture}" data-city="${restaurant.city}" data-description="${restaurant.description}">View Details</button>
                `;

                favoriteItem.querySelector('.cta').addEventListener('click', removeFromFavorites);

                favoriteList.appendChild(favoriteItem);
            });
        })
        .catch(error => console.error('Error displaying favorite restaurants:', error));
}

function removeFromFavorites(event) {
    const { id } = event.target.dataset;

    removeFavoriteRestaurant(id)
        .then(() => {
            console.log('Removed restaurant from favorites with ID:', id);
            displayFavoriteRestaurants();
        })
        .catch(error => console.error('Error removing restaurant from favorites:', error));
}
