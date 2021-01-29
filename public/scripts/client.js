/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * do all DOM work in jQuery's document ready function
 */

//checks if there's any html tags to prevent cross-site scripting
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//checks if tweet surpasses the limit, required min length is set in html which provids browser error notification
const tweetValidate = () => {
  if ($('textarea[name=text]').val().length > 140) {
    $('.error').slideDown("slow", function() {});
    return false;
  }
  return true;
};

//if the tweet is validated and posted the textarea clears and the counter resets
const eraseText = () => {
  $('form').trigger("reset");
  $(".counter").text(140);
};

const renderTweets = function(tweets) {
  $('.tweet-container').empty();
  // loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
  for (let item of tweets) {
    let $tweet = createTweetElement(item);
    $('.tweet-container').prepend($tweet);
  }
};

//formulates html for tweet article using jQuery
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
};

//get tweet info and post tweet info using ajax request
$(document).ready(function() { //waits for DOM
  const loadTweets = () => {
    $.get('/tweets/', function(data) {
      // Display the returned data in browser
      renderTweets(data);
    });
  };
  loadTweets();
  
  $('form').on('submit', function(event) { //when its clicked
    event.preventDefault(); //prevents page reload
    $('.error').hide();
    const formData = $('textarea[name=text]').serialize();
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

