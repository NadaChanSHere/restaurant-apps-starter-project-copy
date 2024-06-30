// detail.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id');

    if (restaurantId) {
        fetchRestaurantDetail(restaurantId);
    }
});

function fetchRestaurantDetail(id) {
    fetch(`https://restaurant-api.dicoding.dev/detail/${id}`)
        .then(response => response.json())
        .then(data => {
            const restaurantDetail = document.getElementById('restaurant-detail');

            restaurantDetail.innerHTML = `
                <h2>${data.restaurant.name}</h2>
                <img src="${data.restaurant.pictureId}" alt="${data.restaurant.name}">
                <p><strong>City:</strong> ${data.restaurant.city}</p>
                <p><strong>Address:</strong> ${data.restaurant.address}</p>
                <p><strong>Description:</strong> ${data.restaurant.description}</p>
                <h3>Food Menu:</h3>
                <ul>
                    ${data.restaurant.menus.foods.map(food => `<li>${food.name}</li>`).join('')}
                </ul>
                <h3>Drink Menu:</h3>
                <ul>
                    ${data.restaurant.menus.drinks.map(drink => `<li>${drink.name}</li>`).join('')}
                </ul>
                <h3>Customer Reviews:</h3>
                <ul>
                    ${data.restaurant.customerReviews.map(review => `<li>${review.name}: ${review.review}</li>`).join('')}
                </ul>
                <button id="toggle-favorite" class="cta" data-id="${data.restaurant.id}" data-name="${data.restaurant.name}" data-picture="${data.restaurant.pictureId}" data-city="${data.restaurant.city}" data-description="${data.restaurant.description}">Toggle Favorite</button>
            `;

            document.getElementById('toggle-favorite').addEventListener('click', toggleFavorite);
        })
        .catch(error => console.error('Error fetching restaurant detail:', error));
}

function toggleFavorite(event) {
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
            console.log('Toggled favorite status for:', restaurant);
            alert('Toggled favorite status successfully!');
        })
        .catch(error => console.error('Error toggling favorite restaurant:', error));
}
