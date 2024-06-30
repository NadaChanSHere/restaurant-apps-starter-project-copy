// main.js
document.addEventListener('DOMContentLoaded', () => {
    fetchRestaurants();
});

function fetchRestaurants() {
    fetch('https://restaurant-api.dicoding.dev/list')
        .then(response => response.json())
        .then(data => {
            const restaurantList = document.getElementById('restaurant-list');
            restaurantList.innerHTML = '';

            data.restaurants.forEach(restaurant => {
                const restaurantItem = document.createElement('div');
                restaurantItem.classList.add('restaurant-item');

                restaurantItem.innerHTML = `
                    <img src="${restaurant.pictureId}" alt="${restaurant.name}">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.city}</p>
                    <button class="cta" data-id="${restaurant.id}" data-name="${restaurant.name}" data-picture="${restaurant.pictureId}" data-city="${restaurant.city}" data-description="${restaurant.description}">View Details</button>
                `;

                restaurantItem.querySelector('.cta').addEventListener('click', addToFavorites);

                restaurantList.appendChild(restaurantItem);
            });
        })
        .catch(error => console.error('Error fetching restaurants:', error));
}

function addToFavorites(event) {
    const { id, name, picture, city, description } = event.target.dataset;
    const restaurant = {
        id,
        name,
        picture,
        city,
        description
    };

    toggleFavoriteRestaurant(restaurant)
        .then(() => {
            console.log('Restaurant added to favorites:', restaurant);
        })
        .catch(error => console.error('Error toggling favorite restaurant:', error));
}
