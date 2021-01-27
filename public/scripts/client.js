/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
for (item of tweets) { // console.log => [object, object];
    let $tweet = createTweetElement(item);
    $('.tweet-container').append($tweet);
  }
}

const createTweetElement = function(tweet) {
  // console.log(moment(tweet['created_at']).fromNow());
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
 
  // let $tweet = $(`<div class="tweet"></div>`);
  // let $name = $(`<header class="name">${tweet['user']['name']}</header>`);
  // let $avatar = $(`<img src="">{$tweet.avatar}</img>`);
  // let $handle = $(`<span class="handle">${tweet['user']['handle']}</span>`);
  // $name.append($handle); //put the handle inside the name tag 
  // $tweet.append($name); //put the whole name DOM object inside the tweet DOM object 

  //  let $tweet = {
  //   name: tweet['user']['name'],
  //   avatar :tweet['user']['avatars'],
  //   handle: tweet['user']['handle'],
  //   content: tweet['content']['text'],
  //   time: tweet['created_at']
  //}

return $tweet;
}

$(document).ready(function() { //waits for DOM
  renderTweets(data);
});
