$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let counter = 140 - this.value.length;
    $('output').text(counter);
    counter < 0 ? $('output').css('color', 'red') : $('output').css('color', '#545149');
  });
});
