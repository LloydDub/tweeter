/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const initalTweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1631657613414
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1631744013414
  }
]

$(document).ready(function () {



  function createTweetElement(tweet) {
    // timeago.format(new Date());

    const name = tweet.user.name;
    const avatars = tweet.user.avatars;
    const handle = tweet.user.handle;
    const content = tweet.content.text;
    const created = tweet.created_at.created
    const html = 
    `<section id="tweet-container">
    <header>
    <div>
    <img src="${avatars}"/> 
    <p>${name}</p>
    </div> 
    <div><p>${handle}</p></div>
    </header>
    <article>
      ${content}  
    </article> 
    <footer class='footer'>
    ${created}
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div> 
    </footer>`;

    return html;

    
  };



const $tweet = createTweetElement(initalTweets[0]);

  $('#tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



})
  