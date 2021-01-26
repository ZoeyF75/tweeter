$(document).ready(function() {
  let count = 140;
  document.addEventListener("input", (event) => {
     //data @ backspace is null so if not data then add to count else subtract if there is data
    !event['data'] ? count++ : count--;
  })
  return count;
});

