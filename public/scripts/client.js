/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
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
            <img src="${tweet['user']['avatars']}"></img>
            <span class="name">${tweet['user']['name']}</span>
          </div>
          <span class="handle">${tweet['user']['handle']}</span>
    </header>
    <title>${tweet['content']['text']}</title>
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
        alert('Error your tweet exceeds the maximum word count :(');
        $('textarea[name=text]').val() = ""; //empty input doesn't post form
        return false;
    } else if ($('textarea[name=text]').val().length === 0) {
      alert('head empty?... why not try thinking');
      return false;
    }
  }

  function eraseText() {
    $('form').trigger("reset");
    $(".counter").text(140);
  }

  loadTweets();

  $(function() {
    const $button = $('#post'); //submit button with post id
    $button.on('click', function (event) { //when its clicked
      event.preventDefault(); //prevents page reload
      tweetValidate();
      const formData = $('textarea[name=text]').serialize() 
      $.ajax({ url: '/tweets/', method: 'POST', data: formData})
        .then(function () {
        loadTweets();
        eraseText();
      });
      // .catch(err => console.log('AJAX error caught ->', err));
    });
  });
});



