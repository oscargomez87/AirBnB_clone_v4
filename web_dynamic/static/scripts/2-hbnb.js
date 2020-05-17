/*
Your script must be executed only when DOM is loaded
You must use jQuery
Listen for changes on each INPUT checkbox tag
*/

$(document).ready(function () {
  const amen = {};

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

  $.ajax({
    type: 'GET',
    url = 'http://0.0.0.0:5001/api/v1/status/',
    success: (function(data, textStatus) {
      if (textStatus === 'OK') {
	$('DIV#api_status').addClass('available');
      } else {
	$('DIV#api_status').removeClass('available');
      }
    });
  });
});
