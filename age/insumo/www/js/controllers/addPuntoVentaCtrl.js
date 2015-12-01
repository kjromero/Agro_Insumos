angular.module('proyect.controllers.addPuntoVentaCtrl',[])

.controller('addPuntoVentaCtrl', function($scope, InfoService, $http,$state, SearchMunicipioInsumo) {
	
	var municipio = InfoService.getMunicipio();

	var userToken = InfoService.getToken();
	var URL = "http://192.168.1.134:8081/api/agroinsumo/";

	var headers = {
		'Access-Control-Allow-Origin' : '*',
		'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	};

	$scope.puntoventaModel = {
		nombre : '',
		lugar: '',
		descripcion:''
	}


  $scope.puntoventaModel.lugar = municipio.nameM + " " + " " + municipio.nameD;

  $scope.searchMunicipio = function(){

    if(!$scope.puntoventaModel.lugar == " ") {
      SearchMunicipioInsumo.searchMunicipios($scope.puntoventaModel.lugar).then(
          function(matches) {
          $scope.puntoventaModel.municipios = matches;
        
          // $scope.imgCategoria = obtenerImgCategoria($scope.data.airlines.IdInsumo);
         }
      )
    }else{
       $scope.puntoventaModel.municipios = [];
    }
    // console.log($scope.puntoventaModel.municipios);
  }

  $scope.selectMunicipio = function(nameMunicipio, nameDepartamento, idM ){
      MunicipioId = idM;
      $scope.puntoventaModel.lugar = nameMunicipio +", "+ nameDepartamento;

      $scope.puntoventaModel.municipios = [];
  }







	$scope.addPv = function(){
		$http({
		    method: 'POST',
		    url: URL+'AgregarPuntoDeVenta',
		    data:{
		    	"Nombre":$scope.puntoventaModel.nombre,
		    	"Municipio":MunicipioId,
		    	"Descripcion":$scope.puntoventaModel.descripcion,
		    	"Token":userToken
		   		},
		    headers:headers,
		 }).then(function(result) {
	          console.log(result);
	          alert(result.data.Texto);
	          // $state.go('home');

	       }, function(error) {
	           console.log(error);
	           alert("Ha ocurrido un error"+error);
	      });
	}

})
 


// busqueda de municipo
.factory('SearchMunicipioInsumo', function($q, $timeout, $http ) {

 
    var searchMunicipios = function(searchMini) { 

        $http({
        method: 'POST',
        url: URL+'ObtenerMunicipios',
        data: {"query":searchMini},
        headers:headers,
        }).then(function(result) {
              municipios = result.data.Data;
              var matches = municipios.filter(function(municipio) {
                if(municipio.Nombre.toLowerCase().indexOf(searchMini.toLowerCase()) !== -1 ) return true;
              })

           
            $timeout( function(){
            
               deferred.resolve( matches );

            }, 100);


           }, function(error) {
            console.log(error);
      });

        var deferred = $q.defer();

        return deferred.promise;

    };

    return {

        searchMunicipios : searchMunicipios

    }
})
