/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function(tweets) {
$('.tweet-container').empty(); 
// loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
for (item of tweets) { // console.log => [object, object];
    let $tweet = createTweetElement(item);
    $('.tweet-container').prepend($tweet);
  }
}

const createTweetElement = function(tweet) {
  let $tweet = $(
    `<article class="tweet">
      <header> 
          <div class="user">
            <img src="${tweet['user']['avatars']}" alt=''/> 
            <span class="name">${tweet['user']['name']}</span>
          </div>
          <span class="handle">${tweet['user']['handle']}</span>
    </header>
    <p>${escape(tweet['content']['text'])}</p>
        <footer>
            <small>${moment(tweet['created_at']).fromNow()}</small>
            <div class="subnotes">
              <i class="fas fa-flag"></i>
              <i class="fas fa-heart"></i>
              <i class="fas fa-retweet"></i>
            </div>
          </footer>
    </article>`
  );
return $tweet;
}

$(document).ready(function() { //waits for DOM
  const loadTweets = () => {
    $.get('/tweets/', function(data){
      // Display the returned data in browser
       renderTweets(data);
    });
  }

  const tweetValidate = () => {
    if ($('textarea[name=text]').val().length > 140) {
        $('.error').slideDown( "slow", function() {});
        return false;
    } else if ($('textarea[name=text]').val() === '' || $('textarea[name=text]').val() === null) {
      //$('.error').slideDown( "slow", function() {});
    } 
    return true;
  }

  const eraseText = () => {
    $('form').trigger("reset");
    $(".counter").text(140);
  }

  loadTweets();

  
  $("form").on('submit', function (event) { //when its clicked
      event.preventDefault(); //prevents page reload
      $('.error').hide();
      const formData = $('textarea[name=text]').serialize() 
      if (tweetValidate()) {
      $.ajax({ url: '/tweets/', method: 'POST', data: formData})
        .then(() => {
        loadTweets();
        eraseText();
      })
      .catch(err => console.log('AJAX error caught ->', err));
      } else {
        return;
      }
  });
});

