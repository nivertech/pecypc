var app = angular.module('oauth2', []);

app.controller('MainCtrl', function($scope, $http) {
  $scope.name = 'World';
  $scope.username = '';
  $scope.login = function (provider) {
    $scope.atoken = '';
    // var loginWindow = window.open('/auth/' + provider + '/login?flow=implicit', 'name', 'height=600,width=450');
    var loginWindow = window.open('/auth/' + provider + '/login?flow=authorization_code', 'name', 'height=600,width=450');
    var old_atoken = window.atoken;
    var poller = setInterval(function () {
      if (window.atoken !== old_atoken) {
        clearInterval(poller);
        old_atoken = window.atoken;
        $scope.atoken = window.atoken;
        $http.get('/api/' + provider + '/user_profile', {params: {access_token: $scope.atoken.access_token}})
        .success(function (profile) {
          $scope.profile = profile;
        });
      }
    }, 200);
  };
  $scope.login1 = function (provider) {
    $http.get('https://a6cypg.hopto.org/auth/' + provider + '/login?flow=implicit', {cache: false})
    .success(function (data) {
      console.log('ok!', provider, arguments);
      $scope.loginWindow = window.open(data, 'name', 'height=600,width=450');
    })
    .error(function () {
      console.error('nak!', provider, arguments);
      $scope.profile = {};
    });
  };
});
