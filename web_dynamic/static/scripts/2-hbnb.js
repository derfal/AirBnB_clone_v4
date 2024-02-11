$(document).ready(function () {
  const checkedAmenities = {};

  function updateAmenitiesDisplay() {
    const lst = Object.values(checkedAmenities);
    const displayText = lst.length > 0 ?
      $('div.amenities > h4').text(lst.join(', ')) :
      $('div.amenities > h4').html('</br>');
  }

  function updateApiStatus(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  }

  $(document).on('change', "input[type='checkbox']", function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if (this.checked) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }

    updateAmenitiesDisplay();
  });

  // Add API status check
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      updateApiStatus(data);
    }
  });
});
