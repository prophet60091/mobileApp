angular.module('app.controllers', ['restangular', 'ngCordova',])

.controller('locationsCtrl', ['$scope', '$state',
  '$stateParams',
  '$cordovaGeolocation',
  '$ionicLoading',
  '$ionicPlatform',
  'Location',
  'GoogleAddress',
function ($scope, $state,  $stateParams, $cordovaGeolocation, $ionicLoading, $ionicPlatform, Location, GoogleAddress) {
    var showLocation = false;
    var address = {};
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
            $scope.clocFormattedAddress = results[0].formatted_address;
            $scope.$apply();
            GoogleAddress.address = results[0].address_components;
            GoogleAddress.clocFormattedAddress = results[0].formatted_address;
            //console.log("resulting address", address);
          }
          $ionicLoading.hide();
        });


      }, function(err) {
        $ionicLoading.hide();
        console.log(err);
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

  //Add Current location, or searched location to the list.
  $scope.addLocation = function(){
      showLocation = false;
      //console.log("address to be saved", address);
      $state.go('addLocation', {});
  };

}])

.controller('addLocationCtrl', ['$scope', '$stateParams', 'Location', 'GoogleAddress', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller

function ($scope, $stateParams, Location, GoogleAddress, $location) {

  var addy = GoogleAddress.address; // just to shorten it up

  //populate the form
  if(addy != '' && addy != undefined){
    console.log("you got it!");
    $scope.num = addy[0].long_name;
    $scope.street = addy[1].long_name;
    $scope.unit = addy[2].long_name;
    $scope.city = addy[3].long_name;
    $scope.state = addy[5].long_name;
    $scope.zip = addy[7].long_name + '-' + addy[8].long_name;
    $scope.clocFormattedAddress = addy.formatted_address;
  }

  /**
   * Save the location
   */
  $scope.saveLocation= function() {
    Location.post($scope.loca).then(function(response) {
      $location.path('/location');
    },function(response){
      console.log( response);
      //we got a bad response - i.e. something what not filled out
      if(response.status == 400){
        //do some stuff with it
        $scope.failed = true;
        $scope.failMessage = response.data.errors.name.path + " is required";
      }
    });
  };

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
