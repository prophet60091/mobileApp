angular.module('app.controllers', ['restangular', 'ngCordova',])

.controller('locationsCtrl', ['$scope',
  '$stateParams',
  '$cordovaGeolocation',
  '$ionicLoading',
  '$ionicPlatform',
  'Location',
function ($scope, $stateParams, $cordovaGeolocation, $ionicLoading, $ionicPlatform, Location) {
    var showLocation = false;
    /**
    *
    */
    $scope.show = function(){
      $ionicLoading.show({
       template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
      });
    };
    $scope.hide = function(){
      $ionicLoading.hide();
    };


    /**
    * Get the location of the User
    *  Adapted from http://www.gajotres.net/using-cordova-geoloacation-api-with-google-maps-in-ionic-framework/
    */
    $scope.getCurLocation = function(){

      //show the location
      this.showLocation = true; //toggles the card

      var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };

      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        var geocoder = new google.maps.Geocoder;

        var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $ionicLoading.show({
          template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        geocoder.geocode({'location': myLatlng}, function(results, status) {
          if (status === 'OK') {
            //console.log('sok', address);
            $scope.clocFormattedAddress = results[1].formatted_address;
            $scope.$apply();
          } });

        // $ionicLoading.hide();

      }, function(err) {
        $ionicLoading.hide();
        console.log(err);
      }).finally(function($ionicLoading){
          $ionicLoading.hide();
      })
    };

  //locations available from the API
  $scope.getLocations = function() {
    Location.getList().then(function (data) {
      $scope.locations = data;

    }, function (response) {
      console.log("resp:" + response);
    });
  };

  $scope.addLocation = function(){
      showLocation = false;
      this.getLocations();
      $scope.$apply();
  };
  // $scope.getLoca = getLocations(Location);

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
