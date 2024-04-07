$(document).ready(function () {
  const checkedAmenities = {};
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      checkedAmenities[amenityId] = amenityName;
    } else {
      delete checkedAmenities[amenityId];
    }
    const checkedNames = Object.values(checkedAmenities);
    $('.amenities h4').text(checkedNames.join(', '));
  });
});
