angular.module('proyect.controllers.favoritoCtrl',[])

.controller('favoritoCtrl', function($scope,InfoService, $http, $state) {
	 
	$scope.adding = true;

  	var userToken = InfoService.getToken();
  	var URL = "http://192.168.1.134:8081/api/agroinsumo/";
  	
  	var categoria = 0;
	

  	//poblar lista   de favoritos
 

    $http({
	    method: 'POST',
	    url: URL+'ObtenerInsumosFavoritos',
	    data: {"Token": userToken},
	    headers:headers,
		}).then(function(result) {
		    $scope.favoritos = result.data.Data;

	       }, function(error) {
	        console.log(error);
    });

  

})