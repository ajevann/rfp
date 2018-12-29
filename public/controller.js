app.controller("rpCtrl", 
  function($scope, $timeout, rpFactory){

    $scope.posts = [];
    $scope.subreddits = [];
    $scope.status = "OK";
    $scope.category = "news";

    $scope.setCategory = function(category){
      $scope.category = category;
    };

    $scope.refreshPosts = function(){
      $scope.posts = [];
      init();
    }

    function getPosts() {
      rpFactory.getPosts().then(function(posts){
        angular.forEach(posts, function(value, key) {
          if (value.data.domain.indexOf("imgur.com") == -1) {
            var post = value.data;
            
            var numer = (post.num_comments == "NaN" ? 1 : post.num_comments) - post.score;
            var denom = (new Date()).getTime()/1000 - post.created;
            post.score = numer/denom;

            post.showSelfText = false;

            $scope.posts.push(post);
          }
        });
      });
    }

    function getSubreddits() {
      $scope.subreddits = rpFactory.getSubreddits();
    }

    function init() {
      getPosts();
      getSubreddits();
    }

    init();

  }
);