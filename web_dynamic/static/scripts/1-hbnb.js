$(document).ready(function () {
  const checkedAmenities = {};

  function updateAmenitiesDisplay() {
    const lst = Object.values(checkedAmenities);
    const displayText = lst.length > 0 ? 
        $('div.amenities > h4').text(lst.join(', ')) : 
        $('div.amenities > h4').html('</br>');
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
});
