angular.module('app.routes', ['restangular'])

.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  RestangularProvider.setBaseUrl('http://54.201.28.243');

  $stateProvider


  .state('tabsController.locations', {
    url: '/location',
    views: {
      'tab1': {
        templateUrl: 'templates/locations.html',
        controller: 'locationsCtrl'
      }
    }
  })

  .state('addLocation', {
    url: '/create/location/:address/{noClue}',
    templateUrl: 'templates/addLocation.html',
    controller: 'addLocationCtrl',
    address:null,
    noClue: null
  })

  .state('tabsController.beers', {
    url: '/beer',
    views: {
      'tab2': {
        templateUrl: 'templates/beers.html',
        controller: 'beersCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/page1/location')



});
