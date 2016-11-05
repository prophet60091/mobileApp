angular.module('app.controllers', ['restangular', 'ngCordova', 'google.places'])

.controller('locationsCtrl', ['$scope',
  '$stateParams',
  '$cordovaGeolocation',
  '$ionicLoading',
  '$ionicPlatform',
  'Location',
// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $cordovaGeolocation, $ionicLoading, $ionicPlatform, Location) {

    //Attempt to get the users Current location
    /*$scope.getCurLocation = function($cordovaGeolocation, $ionicLoading){

      var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };

      var onSuccess = function(position) {
        alert('Latitude: '      + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
      };

      // onError Callback receives a PositionError object
      //
      function onError(error) {
        alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
      }

       // $ionicLoading.show({
       //  template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
       // });

      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;

        var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        //var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var address = new google.maps.GeocodeRequest({'location': myLatlng}, function(results, status) {
          if (status === 'OK') {
            console.log('sok', address);
          } });

        //$scope.map = map;
        $scope.address = address;
        //$ionicLoading.hide();

      }, function(err) {
        $ionicLoading.hide();
        console.log(err);
      })
    };*/

  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $scope.address = new google.maps.GeocodeRequest({'location': myLatlng}, function(results, status) {
      if (status === 'OK') {
        console.log('sok', address);
      } });

  }, function(error){
    console.log("Could not get location");
  });


    //locations available from the API
    $scope.getLocations = function (Location) {
      Location.getList().then(function (data) {
        $scope.locations = data;

      }, function (response) {
        console.log("resp:" + response);
      });
    }

  //Add Current location, or searched location to the list.



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
