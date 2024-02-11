$(document).ready(function () {
  const checkedAmenities = {};

  function updateAmenities() {
    const lst = Object.values(checkedAmenities);
    const amenitiesHeader = $('div.amenities > h4');

    if (lst.length > 0) {
      amenitiesHeader.text(lst.join(', '));
    } else {
      amenitiesHeader.html('&nbsp;');
    }
  }

  function updateApiStatus() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success') {
        $('#api_status').toggleClass('available', data.status === 'OK');
      }
    });
  }

  function renderPlaces(data) {
    const placesContainer = $('.places');

    data.forEach(place => {
      placesContainer.append(`
        <article>
          <h2>${place.name}</h2>
          <div class="price_by_night"><p>$${place.price_by_night}</p></div>
          <div class="information">
            <div class="max_guest"><div class="guest_image"></div><p>${place.max_guest}</p></div>
            <div class="number_rooms"><div class="bed_image"></div><p>${place.number_rooms}</p></div>
            <div class="number_bathrooms"><div class="bath_image"></div><p>${place.number_bathrooms}</p></div>
          </div>
          <div class="description"><p>${place.description}</p></div>
        </article>
      `);
    });
  }

  function fetchPlaces() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      success: renderPlaces
    });
  }

  function filterPlaces() {
    $('.places > article').remove();

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ 'amenities': Object.keys(checkedAmenities) }),
      dataType: 'json',
      contentType: 'application/json',
      success: renderPlaces
    });
  }

  // Event listeners
  $(document).on('change', "input[type='checkbox']", function () {
    if (this.checked) {
      checkedAmenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkedAmenities[$(this).data('id')];
    }
    updateAmenities();
  });

  $('.filters > button').click(filterPlaces);

  // Initial setup
  updateApiStatus();
  fetchPlaces();
});
