document.addEventListener('DOMContentLoaded', () => {
  const checkedAmenities = {};

  function updateAmenitiesText() {
    const amenityValues = Object.values(checkedAmenities);
    const amenitiesHeading = document.querySelector('div.amenities > h4');
    
    if (amenityValues.length > 0) {
      amenitiesHeading.textContent = amenityValues.join(', ');
    } else {
      amenitiesHeading.innerHTML = '&nbsp;';
    }
  }

  document.addEventListener('change', (event) => {
    if (event.target.type === 'checkbox') {
      const { id, name } = event.target.dataset;

      if (event.target.checked) {
        checkedAmenities[id] = name;
      } else {
        delete checkedAmenities[id];
      }

      updateAmenitiesText();
    }
  });

  fetch('http://0.0.0.0:5001/api/v1/status/')
    .then(response => response.json())
    .then(data => {
      const apiStatusElement = document.getElementById('api_status');
      apiStatusElement.classList.toggle('available', data.status === 'OK');
    })
    .catch(error => console.error('Error fetching API status:', error));

  fetch('http://0.0.0.0:5001/api/v1/places_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
    .then(response => response.json())
    .then(data => {
      const placesContainer = document.querySelector('.places');

      data.forEach(place => {
        placesContainer.innerHTML += `
          <article>
            <h2>${place.name}</h2>
            <div class="price_by_night"><p>$${place.price_by_night}</p></div>
            <div class="information">
              <div class="max_guest">
                <div class="guest_image"></div>
                <p>${place.max_guest}</p>
              </div>
              <div class="number_rooms">
                <div class="bed_image"></div>
                <p>${place.number_rooms}</p>
              </div>
              <div class="number_bathrooms">
                <div class="bath_image"></div>
                <p>${place.number_bathrooms}</p>
              </div>
            </div>
            <div class="description"><p>${place.description}</p></div>
          </article>`;
      });
    })
    .catch(error => console.error('Error fetching places:', error));
});
