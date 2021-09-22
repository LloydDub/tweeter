/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



$(document).ready(function () {
console.log("DOC READY!!")
  $('#tweetForm').on('submit', onSubmit);

  renderTweets(data)
})


const onSubmit = function (event) {
  event.preventDefault();  //prevent form from submitting
  console.log("good job on pressing a button!")


  const data = $(this).serialize();
  console.log("data", data); //use the console for debugging, F12 in Chrome, not alerts
  $.post("/tweets", data)
    .then(()=>{

    });
    
}

const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    console.log("look at me", tweet)
    const $tempData = createTweetElement(tweet);
    $('#tweets-container').prepend($tempData);
  });

};

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: data,
      dataType: "json",
      success: function (data) {
        renderTweets(data);
      }
    });
  }
  loadTweets();


const createTweetElement = function (tweet) {
  const name = tweet.user.name;
  const avatars = tweet.user.avatars;
  const handle = tweet.user.handle;
  const content = tweet.content.text;
  const created = moment(tweet.created_at).fromNow()
  let $tweet = `<section class="kuro">
    <header id="tweetHeader">
    <div id="avatarName">
    <img src="${avatars}"/> 
    <p>${name}</p>
    </div>  
    <p id="handle">${handle}</p>    
    </header>
    <article id="article">
      ${content}  
    </article> 
    <footer class='footer'>
    ${created}
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div> 
    </footer>
    </section>`;
  return $tweet;
}