angular.module('app.services', ['restangular'])

.factory('BlankFactory', [function(){

}])
  //Sets up restangular to get the id parameter correct it expects id not _id
.factory('BeerRestangular', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  });
})
//get Beer s
.factory('Beer', function(BeerRestangular){
  return BeerRestangular.service('beer'); // The actual api resource from whence it pulls
})
//get Loactions
.factory('Location', function(BeerRestangular){
  return BeerRestangular.service('location'); // The actual api resource from whence it pulls
})

.service('GoogleAddress', [function(){
  this.clocFormattedAddress = null;
  this.address = null;
}]);
