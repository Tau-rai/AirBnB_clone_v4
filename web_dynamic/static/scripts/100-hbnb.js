$(document).ready(function () {
    const checkedAmenities = {};
    const checkedStatesCities = {};
    $('input[type="checkbox"]').change(function () {
      const dataId = $(this).data('id');
      const dataName = $(this).data('name');
      if ($(this).is(':checked')) {
        checkedAmenities[dataId] = dataName;
        checkedStatesCities[dataId] = dataName;
      } else {
        delete checkedAmenities[dataId];
        delete checkedStatesCities[dataId];
      }
      const checkedNames = Object.values(checkedAmenities);
      $('.amenities h4').text(checkedNames.join(', '));
      const checkedLocations = Object.values(checkedStatesCities);
      $('.locations h4').text(checkedLocations.join(', '));
    });
  
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: function (result) {
        if (result.status === 'OK') {
          $('div#api_status').addClass('available');
        } else {
          $('div#api_status').removeClass('available');
        }
      }
    });
  
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: '{}',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          $('section.places').append('<article><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div><div class="information"><div class="max_guest">' + data[i].max_guest + ' Guest(s)</div><div class="number_rooms">' + data[i].number_rooms + ' Bedroom(s)</div><div class="number_bathrooms">' + data[i].number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + data[i].description + '</div></article>');
        }
      }
    });
  
    $('button').click(function () {
      const amenityIds = Object.keys(checkedAmenities);
      const stateCityIds = Object.keys(checkedStatesCities);
      $.ajax({
        url: 'places_search',
        type: 'POST',
        data: JSON.stringify({ amenities: amenityIds, states: stateCityIds }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
          console.log(response);
        }
      });
    });
  });
  