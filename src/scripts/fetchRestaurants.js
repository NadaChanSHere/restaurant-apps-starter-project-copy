// fetchRestaurants.js
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
                    <a href="./templates/detail.html?id=${restaurant.id}" class="cta">View Details</a>
                `;

                restaurantList.appendChild(restaurantItem);
            });
        })
        .catch(error => console.error('Error fetching restaurants:', error));
}
