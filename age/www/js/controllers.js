var airlines = [{}];

// airlines = airlines.sort(function(a, b) {

// 	var airlineA = a.name.toLowerCase();
// 	var airlineB = b.name.toLowerCase();

// 	if(airlineA > airlineB) return 1;
// 	if(airlineA < airlineB) return -1;
// 	return 0;
// });

// Header enviados en peticion POST

var headers = {
	'Access-Control-Allow-Origin' : '*',
	'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
	'Content-Type': 'application/json',
	'Accept': 'application/json'
};

// Id categoria seleccionada por el usuario

var idCategoria = 0 ;
var IdInsumos = 0;

var URL = "http://192.168.1.134:8081/api/agroinsumo/";


angular.module('proyect.controllers', [])


// Login controller
.controller('loginCtrl', function($scope, $http, API,$state) {

  $scope.API = API;

  // datos ingresados por el usuario
  $scope.login = {
  	Email : '',
  	clave: ''
  };

  // servicio Login .
  $scope.ingresar = function(){
	$http({
	    method: 'POST',
	    url: $scope.API.url+'IniciarSesion',
	    data: { "Email":"pepepe", "Password": "123456"},
	    headers:headers,
	}).then(function(result) {
	           console.log("la respuesta es", result.data.Texto);
	       }, function(error) {
	           console.log(error);
			       console.log(" respuesta NEGATIVA");
        });
  }

  //form login/rregistro
  $scope.existUser = true;
  $scope.textButton = "Crear una cuenta"
  $scope.typeInput = "password"

  var stateViewPassword = true;

  $scope.viewPassword = function(){
    if (stateViewPassword) {
      //Ver
      stateViewPassword = false
      $scope.typeInput = "text"
      
    }else {
      stateViewPassword = true
      $scope.typeInput = "password"
    }
  }

  $scope.onSubmit = function(valid){

    console.log(valid);

    if (valid) {
      $state.go('registro-result');

    } else {
      alert("Verifique FUCKS!! sus datos");
    }

  }
  

  
})

// .controller('homeCtrl', ['$scope', 'InsumoService', function($scope, InsumoService) {

//controlador categorias
.controller('categoriaCtrl', function($scope, InsumoService ) {
  // $scope.API = API;
  alert(idCategoria);
  $scope.insumos ={};

  console.log(idCategoria);

  //poblar lista  
  InsumoService.searchAirlines("", idCategoria).then(
    function(matches) {
      $scope.insumos = matches;
    }
  )

    //Funcion Autocompletable dentro de categoria
    $scope.data = {  "searchInCategoria" : '' };


    $scope.searchInCategoria = function() {

      InsumoService.searchAirlines($scope.data.searchInCategoria, idCategoria).then(
        function(matches) {
          $scope.data.airlines = matches;
        }
      )
    }

    //obtener id de insumo
    $scope.pasId = function(idInsumo){
      IdInsumos = idInsumo ;
    }

    alert(idCategoria);
})


// controlador home

.controller('homeCtrl', ['$scope', 'InsumoService', function($scope, InsumoService) {


	// var url = $scope.API.url;
  $scope.categoriaId = function(categoriaId){
      idCategoria = categoriaId;
      console.log(idCategoria);
  }


  //buscador
  $scope.data = {  "search" : '' };

  //Peticion de busqueda
  $scope.search = function() {

    if (!$scope.data.search == " ") {
      InsumoService.searchAirlines($scope.data.search, idCategoria).then(
        function(matches) {
          $scope.data.airlines = matches;
        }
      )
    }else{
      $scope.data.airlines = [];
    }

  }

  //obtener id de insumo
  $scope.pasId = function(idInsumo){
    IdInsumos = idInsumo ;
  }



}])


//controlador Detalle insumo
.controller('insumoCtrl', function($scope , $http) {

  $scope.detalleInsumo = {};
  $scope.groups = [];

  alert("el insumo que enviamos es ====="+ IdInsumos);
  console.log("el insumo que enviamos es ====="+ IdInsumos);
  //servicio obtener detalle de insumo 
  $http({
      method: 'POST',
      url: URL+'ObtenerDetalleInsumos',
      data: {"Id":IdInsumos},
      headers:headers,
  }).then(function(result) {
            $scope.detalleInsumo = result.data.Data;

            $scope.groups[0] = {
                'name' : 'Marcas en el mercado',
                'items': $scope.detalleInsumo.Marca
            };

            $scope.groups[1] = {
                'name' : 'Puntos de venta',
                'items': $scope.detalleInsumo.PuntosVenta
            };

         }, function(error) {
          console.log(error);
  });


    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };   

    $scope.yea = function(numero){
      if (numero == 1) {
        alert("Si");

      }else{
        alert("No");
      }
    }


})





// servicio Autocompletable Busqueda de insumos 

.factory('InsumoService', function( $q, $timeout, $http ) {

    // $scope.API = API;


    var searchAirlines = function(searchFilter , idCategoria) {
         
      
        // console.log('la busqueda es' + searchFilter);

        $http({
		    method: 'POST',
		    url: URL+'ObtenerInsumos',
		    data: {"CategoryId":idCategoria,"MunicipioId":"12", "Query":searchFilter},
		    headers:headers,
    		}).then(function(result) {
    		        airlines = result.data.Data;
    		        console.log("la respuesta fueee "+ airlines);

    			    var matches = airlines.filter(function(airline) {
    			    	if(airline.NombreInsumo.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
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

        searchAirlines : searchAirlines

    }
});
