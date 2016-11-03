angular.module('app.services', ['restangular'])

.factory('BlankFactory', [function(){

}])
.factory('BeerRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  });
})
.factory('Beer', function(BeerRestangular){
  return BeerRestangular.service('beer') // The actual api resource from whence it pulls
})

.service('BlankService', [function(){

}]);
