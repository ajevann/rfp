app.factory("rpFactory", 
  function ($http, $q) {
    var rpFactory = {};
    var baseURL = "https://www.reddit.com/r/";
    var posts = [];
    var subreddits = [
      {"type":"dev",     "name":"CSS"},
      {"type":"dev",     "name":"database"},
      {"type":"science", "name":"Economics"},
      {"type":"news",    "name":"geopolitics"},
      {"type":"dev",     "name":"HTML5"},
      {"type":"dev",     "name":"hosting"},
      {"type":"news",    "name":"inthenews"},
      {"type":"dev",     "name":"javascript"},
      {"type":"news",    "name":"LegalNews"},
      {"type":"science", "name":"nasa"},
      {"type":"news",    "name":"news"},
      {"type":"news",    "name":"NeutralPolitics"},
      {"type":"news",    "name":"politics"},
      {"type":"news",    "name":"science"},
      {"type":"science", "name":"space"},
      {"type":"science", "name":"SpacePolicy"},
      {"type":"science", "name":"spacex"},
      {"type":"news",    "name":"TrueNews"},
      {"type":"dev",     "name":"Web_Development"},
      {"type":"dev",     "name":"web_infrastructure"},
      {"type":"dev",     "name":"webapps"},
      {"type":"dev",     "name":"webdev"},
      {"type":"dev",     "name":"websecurity"},
      {"type":"news",    "name":"Worldevents"},
      {"type":"news",    "name":"worldnews"},
      {"type":"news",    "name":"worldpolitics"}
    ];

    rpFactory.getPosts = function() {
      return $q.all(subreddits.map(function (item) {
        return $http({
          method: 'GET',
          url: baseURL + item.name + ".json"
        });
      }))
      .then(function (results) {
        results.forEach(function (val, i) {
          posts = posts.concat(val.data.data.children);
        });
        return posts;
      });
    };

    rpFactory.getSubreddits = function() {
      return subreddits;
    };

    rpFactory.addSubreddit = function(subreddit) {
      try {
        subreddits.push(subreddit);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    };

    rpFactory.removeSubreddit = function(subreddit) {
      try {
        angular.forEach(subreddits, function(value, key) {
          var indexToRemove = -1;
          if (value == subreddit) {
            indexToRemove = key;
          }
        });
        if (indexToRemove > -1) {
          subreddits.splice(indexToRemove, 1);
          return true;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    };

    return rpFactory;
  }
);