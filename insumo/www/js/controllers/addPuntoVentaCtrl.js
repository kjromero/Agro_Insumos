angular.module('proyect.controllers.addPuntoVentaCtrl',[])

.controller('addPuntoVentaCtrl', function($scope, InfoService, $http,$state) {
	

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

	$scope.addPv = function(){
		$http({
		    method: 'POST',
		    url: URL+'AgregarPuntoDeVenta',
		    data:{
		    	"Nombre":$scope.puntoventaModel.nombre,
		    	"Municipio":"1140",
		    	"Descripcion":$scope.puntoventaModel.descripcion,
		    	"Token":userToken
		   		},
		    headers:headers,
		 }).then(function(result) {
	          console.log(result);
	          alert(result.data.Texto);
	          $state.go('home');

	       }, function(error) {
	           console.log(error);
	           alert("Ha ocurrido un error"+error);
	      });
	}

})
 
