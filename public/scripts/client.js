$(document).ready(function () {
  $("#error1").hide();
  $("#error2").hide();
  loadTweets();
  $("#tweetForm").on("submit", onSubmit);
});

const onSubmit = function (event) {
  event.preventDefault();
  $("#error1").hide();
  $("#error2").hide();

  const data = $(this).serialize();

  if (data.length > 145) {
    $("#error2").slideDown("slow");
    return;
  } else if (data.length < 6) {
    $("#error1").slideDown("slow");
    return;
  }

  $.post("/tweets", data).then(() => {
    loadTweets();
  });
};

const renderTweets = function (tweets) {
  tweets.forEach((tweet) => {
    const $tempData = createTweetElement(tweet);
    $("#tweets-container").prepend($tempData);
  });
};

function loadTweets() {
  $("#tweets-container").empty(); // empties the container so there is not duplicates

  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: (tweet) => {
      renderTweets(tweet);
    },
  });
}

const createTweetElement = function (tweet) {
  const name = tweet.user.name;
  const avatars = tweet.user.avatars;
  const handle = tweet.user.handle;
  // const content = tweet.content.text;
  const created = moment(tweet.created_at).fromNow();
  let $tweet = `<section class="kuro">
      <header id="tweetHeader">
      <div id="avatarName">
      <img src="${avatars}"/> 
      <p>${name}</p>
      </div>  
      <p id="handle">${handle}</p>    
      </header>
      <article id="article">
      ${escape(tweet.content.text)}
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
};

/// Prevent Cross Scripting
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
