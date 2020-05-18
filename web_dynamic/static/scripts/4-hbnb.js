/*
Your script must be executed only when DOM is loaded
You must use jQuery
Listen for changes on each INPUT checkbox tag
*/

$(document).ready(function () {
  const amen = {};
  const api = 'http://0.0.0.0:5001/api/v1';
  const apiStatus = api + '/status';
  const apiPlaces = api + '/places_search';

  function placesRender (idx, place) {
    $('section.places').append(
      '<article>' +
        '<div class="title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">' + place.price_by_night + '</div>' +
        '</div>' +
        '<div class="information">' +
          '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
          '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
          '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
        '</div>' +
          '<div class="user"><b>Owner:</b> None</div>' +
          '<div class="description">' + place.description + '</div>' +
      '</article>'
    );
  }

  $('input:checkbox').click(function () {
    $(this).each(function () {
      if (this.checked) {
        amen[$(this).data('id')] = $(this).data('name');
      } else {
        delete amen[$(this).data('id')];
      }
    });
    if (Object.values(amen).length > 0) {
      $('.amenities h4').text(Object.values(amen).join(', '));
    } else {
      $('.amenities h4').html('&nbsp');
    }
  });

  $.get(apiStatus, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: apiPlaces,
    contentType: 'application/json',
    data: '{}',
    success: function (places) {
      $.each(places, function (idx, place) {
        placesRender(idx, place);
      });
    }
  });

  $('button').click(function () {
    $('section.places').empty();
    const data = { amenities: [Object.keys(amen).join(', ')] };
    $.ajax({
      type: 'POST',
      url: apiPlaces,
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (places) {
        $.each(places, function (idx, place) {
          placesRender(idx, place);
        });
      }
    });
  });
});
