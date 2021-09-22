$(document).ready(function () {
  console.log("DOC READY!!")
    $('#tweetForm').on('submit', onSubmit);
    loadTweets();
    // renderTweets(data)
  })
  
  
  const onSubmit = function (event) {
    event.preventDefault();  //prevent form from submitting
    console.log("good job on pressing a button!")
  
  
    const data = $(this).serialize();
    if (data.length > 140) {
      alert('tweet to long')
      return;
    }
    $.post("/tweets", data)
      .then(()=>{
  
      });
      loadTweets()
  }
  
  const renderTweets = function (tweets) {
    tweets.forEach((tweet) => {
      console.log("look at me", tweet)
      const $tempData = createTweetElement(tweet);   
      $('#tweets-container').prepend($tempData);
     
      
    });
  
  };
  
    function loadTweets() {
      $('#tweets-container').empty()  // empties the container so there is not duplicates
      
      console.log('loadtweets' )
      $.ajax({
        url: "/tweets",
        method: "GET",
        // data: data,
        dataType: "json",
        success:  (tweet) => {
          console.log('succsess', tweet)
          renderTweets(tweet);
          
        }
      });
    }
    
  
  
  const createTweetElement = function (tweet) {
    const name = tweet.user.name;
    const avatars = tweet.user.avatars;
    const handle = tweet.user.handle;
    // const content = tweet.content.text;
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
  }
  // ${content}${escape(tweet.content.text)}

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };