/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const renderTweets = function(tweets) {
// loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
for (item of tweets) { // console.log => [object, object];
    let $tweet = createTweetElement(item);
    $('.tweet-container').append($tweet);
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
  renderTweets(data);
  $(function() {
    const $button = $('#post'); //submit button with post id
    $button.on('click', function () { //when its clicked
      console.log('Submit activated, performing ajax call...');
      event.preventDefault(); //prevents page reload
      const formData = {
        'tweet-text': $('textarea[name=text]').serialize()
      } 
      console.log(formData);
      $.ajax('/index.html', 'POST')
      .then(function (formData) {
        console.log('Success: ', formData );
        // $(".tweetcontainer.".append(get(renderTweets(formData))));
      });
    });
  });
});



