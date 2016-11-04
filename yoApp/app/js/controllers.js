angular.module('app.controllers', ['restangular', 'ngCordova'])

.controller('locationsCtrl', ['$scope', '$stateParams', $cordovaGeolocation, $ionicLoading, $ionicPlatform, // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
    });

    var posOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;

      var myLatlng = new google.maps.LatLng(lat, long);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var address = new google.maps.GeocodeRequest({'location': myLatlng}, function(results, status) {
        if (status === 'OK') {
          console.log('sok');
        } });

      $scope.map = map;
      $ionicLoading.hide();

    }, function(err) {
      $ionicLoading.hide();
      console.log(err);
    });

}])

.controller('addLocationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams ) {


}])

.controller('beersCtrl', ['$scope', '$stateParams', 'Beer', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Beer) {

  Beer.getList().then(function(data) {
    $scope.beers = data;

  },function(response){
    console.log("resp:" + response);
  });

}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
